const { response } = require("express");
const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');
const EstadisticaEquipo = require('../models/estadisticaEquipo');
const Posicion = require('../models/posicion')


const obtenerEstadisticasPorLiga = async (req, res) => {
    try {
        // Obtener el ID de la liga desde la solicitud (por ejemplo, desde los parámetros de la URL)
        const { idLiga } = req.params;

        // Buscar los equipos que pertenecen a la liga
        const equiposEnLiga = await Equipo.find({ liga: idLiga });

        // Inicializar un objeto para almacenar las estadísticas de los equipos en esta liga
        const estadisticasPorLiga = {};

        // Iterar a través de los equipos en la liga
        for (const equipo of equiposEnLiga) {
            // Buscar las estadísticas de este equipo en la liga actual
            const estadisticasEquipo = await EstadisticaEquipo.findOne({
                equipo: equipo._id,
                temporada: { $lte: new Date() }, // Puedes ajustar esto para la temporada actual
                esActual: true, // Puedes ajustar esto según si son las estadísticas actuales o no
            });

            if (estadisticasEquipo) {
                // Agregar las estadísticas del equipo al objeto de estadísticas por liga
                estadisticasPorLiga[equipo._id] = {
                    equipo: equipo._id,
                    nombreEquipo: equipo.nombre,
                    ...estadisticasEquipo.toObject(),
                };
            }
        }

        // Enviar las estadísticas por liga como respuesta JSON
        res.status(200).json(estadisticasPorLiga);
    } catch (error) {
        console.error('Error al obtener las estadísticas por liga:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener las estadísticas por liga' });
    }
};
const obtenerEstadisticasPorEquipo = async (req, res) => {
    try {
        // Obtener el ID del equipo desde la solicitud (por ejemplo, desde los parámetros de la URL)
        const { idEquipo } = req.params;

        // Buscar las estadísticas del equipo en la temporada actual que tienen la bandera esActual configurada como true
        const estadisticasEquipo = await EstadisticaEquipo.findOne({
            equipo: idEquipo,
            temporada: { $lte: new Date() }, // Puedes ajustar esto para la temporada actual
            esActual: true, // Puedes ajustar esto según si son las estadísticas actuales o no
        })
        .populate('equipo','nombre img')
                        
        .populate('liga', 'nombre img')
         ;

        if (estadisticasEquipo) {
            // Enviar las estadísticas del equipo como respuesta JSON
            res.status(200).json(estadisticasEquipo.toObject());
        } else {
            // Si no se encuentran estadísticas para el equipo, enviar un mensaje de error
            res.status(404).json({ error: 'No se encontraron estadísticas para el equipo' });
        }
    } catch (error) {
        console.error('Error al obtener las estadísticas del equipo:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener las estadísticas del equipo' });
    }
};

const obtenerEstadisticasPorLigaYTemporada = async (req, res) => {
    try {
        // Obtener el ID de la liga y la temporada desde la solicitud (por ejemplo, desde los parámetros de la URL)
        const { idLiga, temporada } = req.params;

        // Buscar los equipos que pertenecen a la liga
        const equiposEnLiga = await Equipo.find({ liga: idLiga });

        // Inicializar un objeto para almacenar las estadísticas de los equipos en esta liga y temporada
        const estadisticasPorLigaYTemporada = {};

        // Iterar a través de los equipos en la liga
        for (const equipo of equiposEnLiga) {
            // Buscar las estadísticas del equipo en la liga y temporada especificadas
            const estadisticasEquipo = await EstadisticaEquipo.findOne({
                equipo: equipo._id,
                temporada: temporada, // Convertir la temporada a objeto de fecha
                esActual: true, // Puedes ajustar esto según si son las estadísticas actuales o no
            });

            if (estadisticasEquipo) {
                // Agregar las estadísticas del equipo al objeto de estadísticas por liga y temporada
                estadisticasPorLigaYTemporada[equipo._id] = {
                    equipo: equipo._id,
                    nombreEquipo: equipo.nombre,
                    ...estadisticasEquipo.toObject(),
                };
            }
        }

        // Enviar las estadísticas por liga y temporada como respuesta JSON
        res.status(200).json(estadisticasPorLigaYTemporada);
    } catch (error) {
        console.error('Error al obtener las estadísticas por liga y temporada:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener las estadísticas por liga y temporada' });
    }
};

const getEstadisticasPorEquipoLigaEsActual = async (req, res = response) => { 
    const idLiga = req.params.id;

    //estadisticas/verEstadisticasLigaActuales/<idliga>?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const estadisticas = await EstadisticaEquipo.find({"liga": idLiga, "esActual":true})
                        .populate('equipo','nombre img')
                        
                        .populate('liga', 'nombre img')
                        
                        .skip( desde )
                        .limit( limite );

    res.status(200).json({
        ok: true,
        estadisticas: estadisticas
    })

} 

const terminarLasEstadisticasEquipos = async (req, res = response) => {
    try {
        const temp = req.params.temp;
        const idLiga = req.params.id;
    
    
        const resultado = await EstadisticaEquipo.updateMany(
            { "temporada": temp, "liga":idLiga  },
            { $set: { "esActual": false } }
        );

        if (resultado.nModified > 0) {
            res.status(200).json({
                ok: true,
                msg: 'Se han inactivado las estadisticas de los Equipos'
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'A ocurrido un error al intentar inactivar las estadisticas. Por favor hable con el administrador.'
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

    obtenerEstadisticasPorLiga,
    obtenerEstadisticasPorEquipo,
    obtenerEstadisticasPorLigaYTemporada,
    getEstadisticasPorEquipoLigaEsActual,
    terminarLasEstadisticasEquipos
    
};
