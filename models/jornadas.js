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
    fecha: {
        type: Date,
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

JornadaSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Jornada', JornadaSchema);