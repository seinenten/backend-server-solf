const { Schema, model } = require('mongoose');

const EstadioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    img: {
        type: String
    }

})





EstadioSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Estadio', EstadioSchema );