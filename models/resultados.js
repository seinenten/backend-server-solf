const { Schema, model } = require('mongoose');

const resultadoSchema = Schema({
    liga: {
        type: Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    },
    equipoLocal: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true,
    },
    equipoVisitante: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true,
    },
    golesLocal: {
        type: Number,
        required: true,
    },
    golesVisitante: {
        type: Number,
        required: true,
    },
});

module.exports = model('Resultado', resultadoSchema);
