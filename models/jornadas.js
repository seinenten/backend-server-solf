const { Schema, model } = require('mongoose');

const JornadaSchema = Schema({
    nombre: {
        type: String

    },
    liga: {
        type: Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    },
    enfrentamientos: [
        {
            equipoLocal: {
                type: Schema.Types.ObjectId,
                ref: 'Equipo',
                required: true
            },
            equipoVisitante: {
                type: Schema.Types.ObjectId,
                ref: 'Equipo',
                required: true
            },
            fecha: {
                type: Date
            }
        }

    ]

});

module.exports = model('Jornada', JornadaSchema);