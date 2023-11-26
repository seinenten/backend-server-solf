const { Schema, model } = require('mongoose');

const encuestaPreSchema = Schema({

    pregunta: {
        type: String,
        required: true
    }

}, { collection: 'encuestaPre'} );


encuestaPreSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'EncuestaPre', encuestaPreSchema );