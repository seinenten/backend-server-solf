const { response } = require('express');
const JornadaEnfrentamiento = require('../models/jornadas');
const moment = require('moment');
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

const getJornadasPorliga = async (req, res = response) => {
    const id = req.params.id;

    try {
        const fechaActual = moment().format('YYYY-MM-DD'); // Obtenemos la fecha y hora actual


        const jornadaActual = await JornadaEnfrentamiento.findOne({
            liga: id,
            fecha: { $gte: fechaActual },
        })
            .populate('liga', 'nombre')
            .populate('enfrentamientos.equipoLocal', ['nombre', 'img'])
            .populate('enfrentamientos.equipoVisitante', ['nombre', 'img'])
            .sort({ fecha: 1 }) // Ordenamos por fecha ascendente para obtener la jornada más cercana primero
            .limit(1); // Limitamos el resultado a 1 jornada

        if (!jornadaActual) {
            return res.status(404).json({
                ok: false,
                msg: 'Jornada actual no encontrada para la liga especificada',
            });
        }

        res.status(200).json({
            ok: true,
            jornadaActual,
        });
    } catch (error) {
        console.error('Error al obtener la jornada actual:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};


// Crear una nueva jornada de enfrentamiento
const crearJornadaEnfrentamiento = async (req, res = response) => {
    const { liga, fecha, enfrentamientos } = req.body;

    try {
        const jornadaEnfrentamiento = new JornadaEnfrentamiento({
            liga,
            fecha,
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
