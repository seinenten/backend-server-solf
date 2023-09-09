const { Schema, model } = require('mongoose');

const JornadaSchema = Schema({
    nombre: {
        type: String
    }
});

JornadaSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});

module.exports = model('Jornada', JornadaSchema);