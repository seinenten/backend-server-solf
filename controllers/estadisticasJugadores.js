const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');

const Estadistica = require('../models/estadisticaJugador');


const GenerarstadisticasJugadorPorEnfrentamientos = async (req, res) => {

    const fechaDeGeneracion = req.params.fecha;
    const idLiga = req.params.id;
    try {
        // 1. Buscar todos los enfrentamientos que coincidan con la fecha de generación
        const enfrentamientos = await Enfrentamiento.find({ "fechaDeGeneracion":fechaDeGeneracion, "liga":idLiga })
            // .populate('equipoLocal', 'nombre img')
            // .populate('equipoVisitante', 'nombre img')
            // .populate({
            //     path: 'estadisticas.estadisticasJugadores.jugador',
            //     select: 'nombre img',
            // });

        // 2. Inicializar un objeto para almacenar las estadísticas de los jugadores
        const estadisticasJugadores = {};

        let hayEnfrentamientosActivos = false;

        // 3. Calcular las estadísticas de los jugadores
        enfrentamientos.forEach((enfrentamiento) => {

            if (enfrentamiento.esActual) {
                hayEnfrentamientosActivos = true;
            }


            enfrentamiento.estadisticas?.estadisticasJugadores?.forEach((estadisticaJugador) => {
                const jugadorId = estadisticaJugador.jugador._id;

                // Inicializar las estadísticas del jugador si no existen
                if (!estadisticasJugadores[jugadorId]) {
                    estadisticasJugadores[jugadorId] = {
                        jugador: estadisticaJugador.jugador,
                        equipo: enfrentamiento.equipoLocal, // Puedes elegir el equipo local o visitante aquí
                        goles: 0,
                        faltas: 0,
                        expulsiones: 0,
                        temporada: fechaDeGeneracion,
                        esActual: hayEnfrentamientosActivos
                    };
                }

                // Actualizar las estadísticas del jugador
                estadisticasJugadores[jugadorId].goles += estadisticaJugador.goles;
                estadisticasJugadores[jugadorId].faltas += estadisticaJugador.faltas;
                estadisticasJugadores[jugadorId].expulsiones += estadisticaJugador.expulsado ? 1 : 0;
            });
        });

        // 4. Devolver los datos requeridos
        const estadisticasJugadoresArray  = Object.values(estadisticasJugadores);
        const estadisticasGuardadas = await Estadistica.create(estadisticasJugadoresArray);
        res.status(200).json({
            ok: true,
            estadisticasGuardadas
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            msg: 'Error hablar con el administrador' 
        });
    }
};


module.exports = {
    GenerarstadisticasJugadorPorEnfrentamientos
}