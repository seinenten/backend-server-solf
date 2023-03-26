const { Schema, model } = require('mongoose');

const PreguntasSchema = Schema({

    Pregunta: {
       type: String,
       
        required: true,
    },


});

PreguntasSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Preguntas', PreguntasSchema );