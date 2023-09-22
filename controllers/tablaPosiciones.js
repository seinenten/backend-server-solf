const { response } = require("express");
const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');
const EstadisticaEquipo = require('../models/estadisticaEquipo');
const Posicion = require('../models/posicion')



const obtenerTablaDePosiciones = async (req, res = response) => {
    try {
        // Obtener el ID de la liga desde la solicitud (por ejemplo, desde los parámetros de la URL)
        const { idLiga } = req.params;

        // Buscar todos los enfrentamientos de la liga
        const enfrentamientos = await Enfrentamiento.find({ liga: idLiga });

        // Inicializar un objeto para almacenar las estadísticas de los equipos
        const estadisticasEquipos = {};

        // Obtener la fecha de generación de enfrentamientos (por ejemplo, la del primer enfrentamiento)
        const fechaGeneracionEnfrentamientos = enfrentamientos.length > 0 ? enfrentamientos[0].fechaDeGeneracion : new Date();

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
                temporada: fechaGeneracionEnfrentamientos, // Usar la fecha de generación de enfrentamientos
                esActual: true, // Establecer esActual en true
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

        // Guardar las estadísticas en el modelo EstadisticaEquipo
        for (const estadisticaEquipo of tablaDePosiciones) {
            const { equipo, ...estadisticas } = estadisticaEquipo;

            await EstadisticaEquipo.create({
                equipo,
                temporada: estadisticaEquipo.temporada,
                esActual: estadisticaEquipo.esActual,
                ...estadisticas,
            });
        }

        // Crear y guardar el documento en el modelo Posicion
        await Posicion.create({
            liga: idLiga,
            temporada: fechaGeneracionEnfrentamientos, // Usar la fecha de generación de enfrentamientos
            esActual: true, // Establecer esActual en true
            posiciones: tablaDePosiciones,
        });

        // Enviar la tabla de posiciones como respuesta JSON
        res.status(200).json(tablaDePosiciones);
    } catch (error) {
        console.error('Error al obtener y guardar la tabla de posiciones:', error);
        // Manejar el error según sea necesario
        res.status(500).json({ error: 'Error al obtener y guardar la tabla de posiciones' });
    }
};


const guardarTablaDePosicionesEnPosicion = async (idLiga, temporada, tablaDePosiciones) => {
    try {
        // Buscar o crear un documento de Posicion para la liga y temporada actual
        let posicion = await Posicion.findOne({ liga: idLiga, temporada });

        if (!posicion) {
            posicion = new Posicion({ liga: idLiga, temporada, esActual: true, posiciones: [] });
        }

        // Actualizar las posiciones en el documento de Posicion
        posicion.posiciones = tablaDePosiciones.map((equipo) => ({
            equipo: equipo.equipo,
            PJ: equipo.PJ,
            PG: equipo.PG,
            PE: equipo.PE,
            PP: equipo.PP,
            GF: equipo.GF,
            GC: equipo.GE, // Cambiar GC a GE para evitar errores
            Puntos: equipo.puntos,
        }));

        // Guardar el documento de Posicion en la base de datos
        await posicion.save();

        console.log('Tabla de posiciones guardada con éxito en Posicion');
    } catch (error) {
        console.error('Error al guardar la tabla de posiciones en Posicion:', error);
    }
};

const guardarEstadisticasEquipos = async (tablaDePosiciones) => {
    try {
        // Guardar las estadísticas en el modelo EstadisticaEquipo
        for (const estadisticaEquipo of tablaDePosiciones) {
            const { equipo, ...estadisticas } = estadisticaEquipo;
            const temporada = estadisticaEquipo.temporada; // Utilizamos la temporada que obtuvimos de los enfrentamientos
            const esActual = true; // Puedes ajustar esto según si son las estadísticas actuales o no

            await EstadisticaEquipo.create({
                equipo,
                temporada,
                esActual,
                ...estadisticas,
            });
        }

        console.log('Estadísticas de equipos guardadas con éxito en EstadisticaEquipo');
    } catch (error) {
        console.error('Error al guardar las estadísticas de equipos en EstadisticaEquipo:', error);
    }
};
module.exports = {
    obtenerTablaDePosiciones,
   
    
};
