const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');

const Estadistica = require('../models/estadisticaJugador');


const GenerarstadisticasJugadorPorEnfrentamientos = async (req, res) => {

    const fechaDeGeneracion = req.params.fecha;
    const idLiga = req.params.id;
    try {

        // 1. Verificar si ya existen registros con la misma fechaDeGeneracion y idliga en el modelo Estadistica
        await Estadistica.deleteMany({temporada: fechaDeGeneracion, liga: idLiga });

        // . Buscar todos los enfrentamientos que coincidan con la fecha de generación
        const enfrentamientos = await Enfrentamiento.find({ "fechaDeGeneracion":fechaDeGeneracion, "liga":idLiga })
            

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
                        liga: idLiga,
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
            msg: 'Se han generado las estadisticas'
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            msg: 'Error hablar con el administrador' 
        });
    }
};

const getEstadisticasPorLiga  = async (req, res = response) => {

    const idLiga = req.params.id;

    //estadisticas/verEstadisticasLiga/<idliga>?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const estadisticas = await Estadistica.find({"liga": idLiga})
                        .populate('equipo','nombre img')
                        .populate('jugador','nombre img')
                        .populate('liga', 'nombre img')
                        .skip( desde )
                        .limit( limite );

    res.status(200).json({
        ok: true,
        equipos: estadisticas
    })

}

const getEstadisticasPorLigaTemp  = async (req, res) => {

    const idLiga = req.params.id;
    const temp =  req.params.temp;

    //estadisticas/verEstadisticasLiga/<idliga>?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const estadisticas = await Estadistica.find({"liga": idLiga, "temporada":temp})
                        .populate('equipo','nombre img')
                        .populate('jugador','nombre img')
                        .populate('liga', 'nombre img')
                        .skip( desde )
                        .limit( limite );

    res.status(200).json({
        ok: true,
        equipos: estadisticas
    })

}

const getEstadisticasPorLigaEsActual = async (req, res) => { 

} 

const getMejoresEstadisticasPorLigaEsActual = async (req, res) => { 
    
} 



module.exports = {
    GenerarstadisticasJugadorPorEnfrentamientos,
    getEstadisticasPorLiga,
    getEstadisticasPorLigaTemp,
    getEstadisticasPorLigaEsActual,
    getMejoresEstadisticasPorLigaEsActual,
}