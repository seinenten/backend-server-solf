const { Schema, model } = require('mongoose');

const CambioJugadorSchema = Schema({
    jugadorEntra: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true
    },
    jugadorSale: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true
    },
});

const EstadisticasJugadorSchema = Schema({
    jugador: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true
    },
    faltas: {
        type: Number,
        default: 0
    },
    goles: {
        type: Number,
        default: 0
    },
    expulsado: {
        type: Boolean,
        default: false // true si el jugador fue expulsado durante el partido, false en caso contrario
    },
    cambios: [CambioJugadorSchema]
    // Puedes agregar más campos de estadísticas según tus necesidades
});

const EstadisticasEnfrentamientoSchema = Schema({
    enfrentamiento: {
        type: Schema.Types.ObjectId,
        ref: 'Enfrentamiento',
        required: true
    },
    totalGolesLocal: {
        type: Number,
        default: 0
    },
    totalAutogolesLocal: {
        type: Number,
        default: 0
    },
    totalFaltasLocal: {
        type: Number,
        default: 0
    },
    malUniformadosLocal: {
        type: Number,
        default: 0
    },
    totalGolesVisitante: {
        type: Number,
        default: 0
    },
    totalAutogolesVisitante: {
        type: Number,
        default: 0
    },
    totalFaltasVisitante: {
        type: Number,
        default: 0
    },
    malUniformadosVisitante: {
    type: Number,
        default: 0
    },
    
    estadisticasJugadores: [EstadisticasJugadorSchema] // Array de estadísticas de jugadores
    // Puedes agregar más campos de estadísticas generales del enfrentamiento aquí
});


const EnfrentamientoSchema = Schema({

    liga: {
        type: Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    },

    jornada: {
        type: Number,
        required: true
    },
    
    equipoLocal: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    
    equipoVisitante: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required:true
    },

    fechaDeGeneracion: {
        type: Date,
        required: true // Asegura que cada enfrentamiento tenga una fecha de generación
    },

    esActual: {
        type: Boolean,
        default: true // Los nuevos enfrentamientos son considerados como actuales por defecto
    },

    esTorneo: {
        type: Boolean,
        default: false 
    },

    fechaDeEnfrentamiento: {
        type: Date
    },
    
    estadio: {
        type: Schema.Types.ObjectId,
        ref: 'Estadio',
    },

    estadisticas: {
        type: EstadisticasEnfrentamientoSchema
    }
})

EnfrentamientoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});

module.exports = model('Enfrentamientos', EnfrentamientoSchema);