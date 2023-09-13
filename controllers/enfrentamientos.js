const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');

const generarEnfrentamientosPorLiga = async (req, res) => {
    const ligaId = req.params.ligaId;

    // Obtener la fecha actual y establecer la hora a las 00:00:00.000
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    // Verificar si ya existen enfrentamientos con la misma fecha
    const enfrentamientosConFechaExistente = await Enfrentamiento.findOne({
        fechaDeGeneracion: fechaActual
    });

    if (enfrentamientosConFechaExistente) {
        return res.status(400).json({ msg: 'Ya existen enfrentamientos generados con la fecha de hoy.' });
    }

    // Verificar si ya existen enfrentamientos activos para esta liga
    const enfrentamientosActivos = await Enfrentamiento.findOne({
        liga: ligaId,
        esActual: true
    });

    if (enfrentamientosActivos) {
        return res.status(400).json({ msg: 'Ya existen enfrentamientos activos para esta liga.' });
    }
    //? si pasa la validacion se ejecuta el codigo.

    const equipos = await Equipo.find({ liga: ligaId, status: true }, 'nombre _id');

    // Agregar un equipo de descanso si el número de equipos es impar
    if (equipos.length % 2 !== 0) {
        const equipoDescanso = await Equipo.create({
            nombre: 'Descanso',
            descripcion: 'Equipo utilizado para el descanso',
            descanso: true,
            liga: ligaId,
        });
        equipos.push(equipoDescanso);
    }

    const totalEquipos = equipos.length;
    const totalJornadas = totalEquipos - 1;
    const enfrentamientos = [];

    // Eliminar el equipo de descanso de la lista de equipos
    const indexDescanso = equipos.findIndex(equipo => equipo.descanso);
    if (indexDescanso !== -1) {
        equipos.splice(indexDescanso, 1);
    }

    for (let jornada = 1; jornada <= totalJornadas; jornada++) {
        const enfrentamientoJornada = [];

        for (let i = 0; i < totalEquipos / 2; i++) {
            const equipoLocal = equipos[i];
            const equipoVisitante = equipos[totalEquipos - 1 - i];

            if (equipoLocal && equipoVisitante && !equipoLocal.descanso && !equipoVisitante.descanso) {
                const fechaDeGeneracion = new Date(); // Obtiene la fecha y hora actual
                fechaDeGeneracion.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00.000
                // Aquí puedes configurar la fecha deseada, por ejemplo, un día después
                fechaDeGeneracion.setDate(fechaDeGeneracion.getDate() + 1); // Sumar un día
                enfrentamientoJornada.push({ liga: ligaId, jornada, equipoLocal, equipoVisitante,fechaDeGeneracion });
            }
        }

        enfrentamientos.push(...enfrentamientoJornada);

        // Rotar los equipos en sentido antihorario
        equipos.unshift(equipos.pop());
    }

    try {

        // Buscar el equipo ficticio por su propiedad 'descanso'
        const equipoFicticio = await Equipo.findOne({ descanso: true });

        // Si se encontró el equipo ficticio, eliminarlo
        if (equipoFicticio) {
            await equipoFicticio.remove();
        }

        // Eliminar el equipo de descanso antes de guardar
        const indexDescansoEnfrentamientos = enfrentamientos.findIndex(enfrentamiento =>
            enfrentamiento.equipoLocal.descanso || enfrentamiento.equipoVisitante.descanso
        );
        if (indexDescansoEnfrentamientos !== -1) {
            enfrentamientos.splice(indexDescansoEnfrentamientos, 1);
        }

        await Enfrentamiento.insertMany(enfrentamientos);
        res.status(200).json({
            ok: true,
            msg: "Se han generado los enfrentamientos."
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar los enfrentamientos en la base de datos.' });
    }
};



const getEnfrentamientosPorLiga = async(req, res = response) => {
    const id = req.params.id;

    //enfrentamientos?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const enfrentamientos = await Enfrentamiento.find({"liga":id})
                    .populate('liga', 'nombre')
                    .populate('equipoLocal', 'nombre img')
                    .populate('equipoVisitante', 'nombre img')
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        enfrentamientos: enfrentamientos
    })
}

const getEnfrentamientosPorLigaActuales = async(req, res = response) => {
    const id = req.params.id;

    //enfrentamientos?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const enfrentamientos = await Enfrentamiento.find({"liga":id, "esActual":true})
                    .populate('liga', 'nombre')
                    .populate('equipoLocal', 'nombre img')
                    .populate('equipoVisitante', 'nombre img')
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        enfrentamientos: enfrentamientos
    })
}

const obtenerGruposDeEnfrentamientosPorLiga = async (req, res = response) => {
    const ligaId = req.params.id;

    try {
        console.log('Liga ID:', ligaId); // Agrega un log para verificar el valor de ligaId
        const grupos = await Enfrentamiento.aggregate([
            {
                $match: {
                    liga: ligaId,
                }, // Filtrar por la liga específica
                },
                {
                $group: {
                    _id: {
                    $dateToString: {
                        format: "%Y-%m-%d", // Formato "YYYY-MM-DD"
                        date: "$fechaDeGeneracion",
                    },
                    }, // Agrupar por fecha de generación (sin hora)
                },
                },
            ]);
    
        console.log('Grupos:', grupos); // Agrega un log para verificar los resultados de la consulta
    
        return res.status(200).json({
            ok: true,
            grupos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getEnfrentamientos = async(req, res = response) => {

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const enfrentamientos = await Enfrentamiento.find()
                                .populate('liga', 'nombre')
                                .populate('equipoLocal', 'nombre img')
                                .populate('equipoVisitante', 'nombre img')
                                    .skip( desde )
                                    .limit( limite )

    res.status(200).json({
        ok: true,
        enfrentamientos: enfrentamientos
    });

}
const ActualizarEnfrentamientos= async(req, res = response )=>{

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {

        const enfrentamiento = await Enfrentamiento.findById( id );

        if( !enfrentamiento ){
            return res.status(404).json({
                ok: true,
                msg: 'Enfrentamiento no encontrado por id'
            });
        }

        const cambiosEnfrentamiento = {
            ...req.body,
            usuario: uid
        }
        const enfrentamientoActualizado = await Enfrentamiento.findByIdAndUpdate( id, cambiosEnfrentamiento, { new: true } );

        res.json({
            ok: true,
            enfrentamientos: enfrentamientoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const obtenerPartidosDeEquipoActuales = async (req, res = response) => {

    const id = req.params.id;

    const enfrentamientos = await Enfrentamiento.find({ $or:[ {"equipoVisitante":id} , {"equipoLocal":id}], "esActual":true})
                    .populate('liga', 'nombre')
                    .populate('equipoLocal', 'nombre img')
                    .populate('equipoVisitante', 'nombre img');
                                
                                

    res.status(200).json({
        ok: true,
        enfrentamientos: enfrentamientos
    })

};

const obtenerPartidosDeEquipo = async (req, res = response) => {

    const id = req.params.id;

    const enfrentamientos = await Enfrentamiento.find({ $or:[ {"equipoVisitante":id} , {"equipoLocal":id}]})
                    .populate('liga', 'nombre')
                    .populate('equipoLocal', 'nombre img')
                    .populate('equipoVisitante', 'nombre img');
                                
                                

    res.status(200).json({
        ok: true,
        enfrentamientos: enfrentamientos
    })

};



const getJornadasPorFechaDeGeneracion = async (req, res) => {
    try {
      const id = req.params.id; 
     
      const enfrentamientos = await Enfrentamiento.find({ liga: id })
        .select('fechaDeGeneracion')
        .sort({ fechaDeGeneracion: 1 });
  
     
      const fechasUnicas = new Set();
  
      
      for (let i = 0; i < enfrentamientos.length; i++) {
        const enfrentamiento = enfrentamientos[i];
        fechasUnicas.add(enfrentamiento.fechaDeGeneracion.toISOString().split('T')[0]); // Formatea la fecha sin la hora y agrega al conjunto
      }
  
      
      const fechasSeparadas = [];
      for (const fecha of fechasUnicas) {
        fechasSeparadas.push({ fechaDeGeneracion: fecha });
      }
  
      res.status(200).json({
        ok: true,
        fechasDeGeneracion: fechasSeparadas,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las fechas de generación' });
    }
  };
  


  const buscarPorFechaDeGeneracion = async (req, res) => {
    try {
      const fecha = req.params.busqueda;
  
   
      await Enfrentamiento.updateMany(
        { "fechaDeGeneracion": fecha },
        { $set: { "esActual": false } }
      );
  
    
      const enfrentamientos = await Enfrentamiento.find({ "fechaDeGeneracion": fecha });
  
      res.status(200).json({
        ok: true,
        enfrentamientos: enfrentamientos
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los enfrentamientos o actualizar el campo esActual' });
    }
  };
  



    

module.exports = {
    getEnfrentamientos,
    getEnfrentamientosPorLiga,
    generarEnfrentamientosPorLiga,
    ActualizarEnfrentamientos,
    getEnfrentamientosPorLigaActuales,
    obtenerGruposDeEnfrentamientosPorLiga,
    obtenerPartidosDeEquipoActuales,
    obtenerPartidosDeEquipo,
    getJornadasPorFechaDeGeneracion,
    buscarPorFechaDeGeneracion
}