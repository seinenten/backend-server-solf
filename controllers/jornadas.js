const { response } = require('express');
const JornadaEnfrentamiento = require('../models/jornadas');

// Obtener todas las jornadas de enfrentamientos
const getJornadasEnfrentamientos = async (req, res = response) => {
    try {
        const jornadas = await JornadaEnfrentamiento.find()
            .populate('liga', 'nombre') // Popula la información de la liga
            .populate('enfrentamientos.equipoLocal', 'nombre') // Popula la información del equipo local
            .populate('enfrentamientos.equipoVisitante', 'nombre') // Popula la información del equipo visitante
            .sort({ fechaHora: 1 }); // Ordena por fecha y hora ascendente

        res.status(200).json({
            ok: true,
            jornadas: jornadas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const getJornadasPorliga = async(req, res = response) => {

    const id = req.params.id;

    //equipos?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const jornadas = await JornadaEnfrentamiento.find({"liga":id})
                    .populate('liga', 'nombre') // Popula la información de la liga
                    .populate('enfrentamientos.equipoLocal', 'nombre') // Popula la información del equipo local
                    .populate('enfrentamientos.equipoVisitante', 'nombre') // Popula la información del equipo visitante
                    .sort({ fechaHora: 1 })
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        jornadas: jornadas
    })
}

// Crear una nueva jornada de enfrentamiento
const crearJornadaEnfrentamiento = async (req, res = response) => {
    const { liga, enfrentamientos } = req.body;

    try {
        const jornadaEnfrentamiento = new JornadaEnfrentamiento({
            liga,
            enfrentamientos
        });

        const jornadaEnfrentamientoDB = await jornadaEnfrentamiento.save();

        res.status(201).json({
            ok: true,
            jornadaEnfrentamiento: jornadaEnfrentamientoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

// Actualizar una jornada de enfrentamiento existente
const actualizarJornadaEnfrentamiento = async (req, res = response) => {
    const { id } = req.params;
    const { liga, enfrentamientos } = req.body;

    try {
        const jornadaEnfrentamiento = await JornadaEnfrentamiento.findByIdAndUpdate(
            id,
            { liga, enfrentamientos },
            { new: true }
        );

        res.status(200).json({
            ok: true,
            jornadaEnfrentamiento: jornadaEnfrentamiento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

// Eliminar una jornada de enfrentamiento existente
const eliminarJornadaEnfrentamiento = async (req, res = response) => {
    const { id } = req.params;

    try {
        await JornadaEnfrentamiento.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Jornada de enfrentamiento eliminada'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getJornadasEnfrentamientos,
    crearJornadaEnfrentamiento,
    actualizarJornadaEnfrentamiento,
    eliminarJornadaEnfrentamiento,
    getJornadasPorliga
};
