const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');

const generarEnfrentamientosPorLiga = async (req, res) => {
    const ligaId = req.params.ligaId;
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
                enfrentamientoJornada.push({ liga: ligaId, jornada, equipoLocal, equipoVisitante });
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

        const enfrentamientosGuardados = await Enfrentamiento.insertMany(enfrentamientos);
        res.status(201).json(enfrentamientosGuardados);
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
    

module.exports = {
    getEnfrentamientos,
    getEnfrentamientosPorLiga,
    generarEnfrentamientosPorLiga,
    ActualizarEnfrentamientos
}