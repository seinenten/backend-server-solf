
const { response } = require("express");
const Posicion = require('../models/posicion');

const obtenerTablaDePosicionesPorLiga = async (req, res = response) => {
    try {
        // Obtener el ID de la liga desde la solicitud (por ejemplo, desde los parámetros de la URL)
        const { idLiga } = req.params;

        // Buscar la tabla de posiciones para la liga y temporada actual
        const tablaDePosiciones = await Posicion.findOne({ liga: idLiga, esActual: true });

        if (!tablaDePosiciones) {
            return res.status(404).json({ error: 'Tabla de posiciones no encontrada para esta liga y temporada' });
        }

        // Devolver la tabla de posiciones como respuesta JSON
        res.status(200).json(tablaDePosiciones);
    } catch (error) {
        console.error('Error al obtener la tabla de posiciones por liga:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener la tabla de posiciones por liga' });
    }
};

const obtenerTablaDePosicionesPorLigaYTemporada = async (req, res = response) => {
    try {
        // Obtener el ID de la liga y la temporada desde la solicitud
        const { idLiga, temporada } = req.params;

        // Buscar la tabla de posiciones para la liga y temporada especificadas
        const tablaDePosiciones = await Posicion.findOne({ liga: idLiga, temporada });

        if (!tablaDePosiciones) {
            return res.status(404).json({ error: 'Tabla de posiciones no encontrada para esta liga y temporada' });
        }

        // Devolver la tabla de posiciones como respuesta JSON
        res.status(200).json(tablaDePosiciones);
    } catch (error) {
        console.error('Error al obtener la tabla de posiciones por liga y temporada:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener la tabla de posiciones por liga y temporada' });
    }
};
const obtenerTablaDePosicionesActualPorLiga = async (req, res = response) => {
    try {
        // Obtener el ID de la liga desde la solicitud (por ejemplo, desde los parámetros de la URL)
        const { idLiga } = req.params;

        // Buscar la posición actual por liga
        const posicionActual = await Posicion.findOne({ liga: idLiga, esActual: true });

        if (!posicionActual) {
            return res.status(404).json({ error: 'No se encontró la tabla de posiciones actual para esta liga.' });
        }

        res.status(200).json(posicionActual);
    } catch (error) {
        console.error('Error al obtener la tabla de posiciones actual por liga:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener la tabla de posiciones actual por liga' });
    }
};


module.exports = {
    obtenerTablaDePosicionesPorLiga,
    obtenerTablaDePosicionesPorLigaYTemporada,
    obtenerTablaDePosicionesActualPorLiga
};


