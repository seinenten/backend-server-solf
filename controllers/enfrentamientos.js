const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');

const generarEnfrentamientosPorLiga = async (req, res) => {
    const ligaId = req.params.ligaId;

    // Obtener la fecha actual y establecer la hora a las 06:00:00.000
    const fechaActual = new Date();
    fechaActual.setUTCHours(6, 0, 0, 0);

    //Verificar si ya existen enfrentamientos con la misma fecha
    const enfrentamientosConFechaExistente = await Enfrentamiento.findOne({
        fechaDeGeneracion: fechaActual, liga:ligaId
    });

    if (enfrentamientosConFechaExistente) {
        return res.status(400).json({ 
            ok: false,
            msg: 'Ya existen enfrentamientos generados con la fecha de hoy.'
            });
    }

    // Verificar si ya existen enfrentamientos activos para esta liga
    const enfrentamientosActivos = await Enfrentamiento.findOne({
        liga: ligaId,
        esActual: true
    });

    if (enfrentamientosActivos) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya existen enfrentamientos activos para esta liga.'
        });
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

    // Aleatoriamente mezclar los equipos utilizando el algoritmo de Fisher-Yates
    for (let i = equipos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [equipos[i], equipos[j]] = [equipos[j], equipos[i]];
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
                fechaDeGeneracion.setUTCHours(6, 0, 0, 0); // Establece la hora a las 00:00:00.000
                // Aquí puedes configurar la fecha deseada, por ejemplo, un día después
                //fechaDeGeneracion.setDate(fechaDeGeneracion.getDate()+1); //? Sumar un día. Descomentar para realizar pruebas de lo contrario comentado 
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
        res.status(500).json({ 
            ok: false,
            msg: 'Error al guardar los enfrentamientos en la base de datos.' 
        });
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
                    .populate({
                        path: 'estadisticas.estadisticasJugadores.jugador',
                        select: 'nombre img',
                    })
                    .populate({
                        path: 'estadisticas.estadisticasJugadores.cambios.jugadorEntra', // Poblaciona jugadorEntra
                        select: 'nombre img',
                    })
                    .populate({
                        path: 'estadisticas.estadisticasJugadores.cambios.jugadorSale', // Poblaciona jugadorSale
                        select: 'nombre img',
                    })
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
                    .populate({
                        path: 'estadisticas.estadisticasJugadores.jugador',
                        select: 'nombre img',
                    })
                    .populate({
                        path: 'estadisticas.estadisticasJugadores.cambios.jugadorEntra', // Poblaciona jugadorEntra
                        select: 'nombre img',
                    })
                    .populate({
                        path: 'estadisticas.estadisticasJugadores.cambios.jugadorSale', // Poblaciona jugadorSale
                        select: 'nombre img',
                    })
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        enfrentamientos: enfrentamientos
    })
}

const getEnfrentamientos = async(req, res = response) => {

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const enfrentamientos = await Enfrentamiento.find()
                                .populate('liga', 'nombre')
                                .populate('equipoLocal', 'nombre img')
                                .populate('equipoVisitante', 'nombre img')
                                .populate({
                                    path: 'estadisticas.estadisticasJugadores.jugador',
                                    select: 'nombre img',
                                })
                                .populate({
                                    path: 'estadisticas.estadisticasJugadores.cambios.jugadorEntra', // Poblaciona jugadorEntra
                                    select: 'nombre img',
                                })
                                .populate({
                                    path: 'estadisticas.estadisticasJugadores.cambios.jugadorSale', // Poblaciona jugadorSale
                                    select: 'nombre img',
                                })
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

        // Obtener fechas únicas y sus valores de esActual
        const enfrentamientos = await Enfrentamiento.find({ liga: id })
            .select('fechaDeGeneracion esActual')
            .sort({ fechaDeGeneracion: 1 });

        const fechasDeGeneracion = [];

        for (let i = 0; i < enfrentamientos.length; i++) {
            const enfrentamiento = enfrentamientos[i];
            const fecha = enfrentamiento.fechaDeGeneracion.toISOString().split('T')[0];

            // Comprobar si la fecha ya existe en fechasDeGeneracion
            const fechaExistente = fechasDeGeneracion.find(item => item.fechaDeGeneracion === fecha);

            if (!fechaExistente) {
                // Si la fecha no existe en fechasDeGeneracion, agregarla con el valor de esActual
                fechasDeGeneracion.push({
                    fechaDeGeneracion: fecha,
                    esActual: enfrentamiento.esActual,
                    liga: id
                });
            }
        }

        res.status(200).json({
            ok: true,
            fechasDeGeneracion
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            msg: 'Error al obtener las fechas de generación' 
        });
    }
};



const buscarPorFechaDeGeneracion = async (req, res) => {
    try {
        const fecha = req.params.fecha;
        const idLiga = req.params.id;
    
    
        const resultado = await Enfrentamiento.updateMany(
            { "fechaDeGeneracion": fecha, "liga":idLiga  },
            { $set: { "esActual": false } }
        );

        if (resultado.nModified > 0) {
            res.status(200).json({
                ok: true,
                msg: 'Se han inactivado los enfrentamientos'
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'A ocurrido un error al intentar inactivar los enfrentamientos. Por favor hable con el administrador.'
            });
        }
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            msg: 'Error hablar con el administrador' 
        });
    }
};



    

module.exports = {
    getEnfrentamientos,
    getEnfrentamientosPorLiga,
    generarEnfrentamientosPorLiga,
    ActualizarEnfrentamientos,
    getEnfrentamientosPorLigaActuales,
    obtenerPartidosDeEquipoActuales,
    obtenerPartidosDeEquipo,
    getJornadasPorFechaDeGeneracion,
    buscarPorFechaDeGeneracion
}