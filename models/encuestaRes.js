const { Schema, model } = require('mongoose');

const encuestaResSchema = Schema({

    preguntaId: {
        type: Schema.Types.ObjectId,
        ref: 'EncuestaPre',
        required: true
    },

    respuesta: {
        type: String,
        required: true
    }

}, { collection: 'encuestaRes'} );


encuestaResSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'EncuestaRes', encuestaResSchema );