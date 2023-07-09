const { Schema, model } = require('mongoose');

const PrendaSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    talla: {
        type: String,
        required: true,
    },
    precio: {
        type: String,
        required: true,
    },
    img: {
        type: String
    }
});

PrendaSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Prenda', PrendaSchema );