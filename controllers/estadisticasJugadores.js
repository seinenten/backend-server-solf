const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');
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



const obtenerTablaDePosiciones = async (req, res) => {
    try {
        // Obtener el ID de la liga desde la solicitud (por ejemplo, desde los parámetros de la URL)
        const { idLiga } = req.params;

        // Buscar todos los enfrentamientos de la liga
        const enfrentamientos = await Enfrentamiento.find({ liga: idLiga });

        // Inicializar un objeto para almacenar las estadísticas de los equipos
        const estadisticasEquipos = {};

        // Calcular las estadísticas de los equipos a partir de los enfrentamientos
        enfrentamientos.forEach((enfrentamiento) => {
            const equipoLocalId = enfrentamiento.equipoLocal;
            const equipoVisitanteId = enfrentamiento.equipoVisitante;

            // Verificar si los equipos ya existen en el objeto de estadísticas
            if (!estadisticasEquipos[equipoLocalId]) {
                estadisticasEquipos[equipoLocalId] = { equipo: equipoLocalId, puntos: 0, goles: 0, PJ: 0, PG: 0, PE: 0, PP: 0, GF: 0, GE: 0 };
            }
            if (!estadisticasEquipos[equipoVisitanteId]) {
                estadisticasEquipos[equipoVisitanteId] = { equipo: equipoVisitanteId, puntos: 0, goles: 0, PJ: 0, PG: 0, PE: 0, PP: 0, GF: 0, GE: 0 };
            }

            // Calcular los puntos y goles para cada enfrentamiento
            const golesLocal = enfrentamiento.estadisticas.totalGolesLocal;
            const golesVisitante = enfrentamiento.estadisticas.totalGolesVisitante;

            if (golesLocal > golesVisitante) {
                estadisticasEquipos[equipoLocalId].puntos += 3; // Ganador
                estadisticasEquipos[equipoLocalId].PG += 1;
                estadisticasEquipos[equipoVisitanteId].PP += 1;
            } else if (golesLocal < golesVisitante) {
                estadisticasEquipos[equipoVisitanteId].puntos += 3; // Ganador
                estadisticasEquipos[equipoVisitanteId].PG += 1;
                estadisticasEquipos[equipoLocalId].PP += 1;
            } else {
                estadisticasEquipos[equipoLocalId].puntos += 1; // Empate
                estadisticasEquipos[equipoVisitanteId].puntos += 1; // Empate
                estadisticasEquipos[equipoLocalId].PE += 1;
                estadisticasEquipos[equipoVisitanteId].PE += 1;
            }

            estadisticasEquipos[equipoLocalId].goles += golesLocal;
            estadisticasEquipos[equipoVisitanteId].goles += golesVisitante;

            // Incrementar PJ para ambos equipos
            estadisticasEquipos[equipoLocalId].PJ += 1;
            estadisticasEquipos[equipoVisitanteId].PJ += 1;

            // Calcular GF y GE para ambos equipos
            estadisticasEquipos[equipoLocalId].GF += golesLocal;
            estadisticasEquipos[equipoVisitanteId].GF += golesVisitante;
            estadisticasEquipos[equipoLocalId].GE += golesVisitante;
            estadisticasEquipos[equipoVisitanteId].GE += golesLocal;
        });

        // Obtener información adicional de los equipos (por ejemplo, nombres de equipos) si es necesario
        const equipos = await Equipo.find({ _id: { $in: Object.keys(estadisticasEquipos) } });

        // Construir la tabla de posiciones
        const tablaDePosiciones = Object.values(estadisticasEquipos).map((equipo) => {
            const equipoInfo = equipos.find((e) => e._id.toString() === equipo.equipo.toString());
            return {
                ...equipo,
                nombreEquipo: equipoInfo ? equipoInfo.nombre : 'Equipo Desconocido',
            };
        });

        // Ordenar la tabla de posiciones por puntos y goles (puedes personalizar esto según tus reglas)
        tablaDePosiciones.sort((a, b) => {
            if (b.puntos !== a.puntos) {
                return b.puntos - a.puntos;
            } else {
                return b.goles - a.goles;
            }
        });

        // Enviar la tabla de posiciones como respuesta JSON
        res.status(200).json(tablaDePosiciones);
    } catch (error) {
        console.error('Error al obtener la tabla de posiciones:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener la tabla de posiciones' });
    }
};



module.exports = {
    GenerarstadisticasJugadorPorEnfrentamientos,
    getEstadisticasPorLiga,
    getEstadisticasPorLigaTemp,
    getEstadisticasPorLigaEsActual,
    getMejoresEstadisticasPorLigaEsActual,
    obtenerTablaDePosiciones
}