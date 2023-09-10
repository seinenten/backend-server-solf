const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');

const generarEnfrentamientosPorLiga = async (req, res) => {
    const id = req.params.ligaId;
    const equipos = await Equipo.find({ "liga": id, "status": true }, 'nombre _id');

    const totalEquipos = equipos.length;

    const enfrentamientos = [];

    if (totalEquipos % 2 === 1) {
        equipos.unshift(equipos.pop());
    }

    for (let i = 0; i < totalEquipos - 1; i++) {
        const jornada = i + 1;
        const equiposVisitantes = [...equipos.slice(1)]; // Copiar el arreglo de equipos excepto el primero

        for (const equipoLocal of equipos) {
            const enfrentamientosEnJornada = [];

            for (const equipoVisitante of equiposVisitantes) {
                if (equipoLocal._id !== equipoVisitante._id) {
                    const enfrentamientoExistente = enfrentamientosEnJornada.find((e) => (
                        (e.equipoLocal === equipoLocal._id && e.equipoVisitante === equipoVisitante._id) ||
                        (e.equipoLocal === equipoVisitante._id && e.equipoVisitante === equipoLocal._id)
                    ));

                    if (!enfrentamientoExistente) {
                        enfrentamientosEnJornada.push({
                            liga: id,
                            jornada: jornada,
                            equipoLocal: equipoLocal._id,
                            equipoVisitante: equipoVisitante._id,
                            // Puedes agregar más campos según tus necesidades
                        });
                    }
                }
            }

            enfrentamientos.push(...enfrentamientosEnJornada);
        }

        equipos.push(equipos.shift());
    }

    // Guardar los enfrentamientos en la base de datos
    const enfrentamientosGuardados = await Enfrentamiento.insertMany(enfrentamientos);

    res.status(200).json({
        ok: true,
        mensaje: "Se han generado los enfrentamientos según las restricciones especificadas.",
        enfrentamientos: enfrentamientosGuardados,
    });
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