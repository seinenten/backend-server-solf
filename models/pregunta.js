const { Schema, model } = require('mongoose');

const PreguntaSchema = Schema({

    pregunta: {
        type: String,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

PreguntaSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Pregunta', PreguntaSchema );