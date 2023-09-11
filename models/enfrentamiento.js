const { Schema, model } = require('mongoose');

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

    fechaDeEnfrentamiento: {
        type: Date
    },
    
    estadio: {
        type: Schema.Types.ObjectId,
        ref: 'Estadio',
    }
})

EnfrentamientoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});

module.exports = model('Enfrentamientos', EnfrentamientoSchema);