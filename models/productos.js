const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
       
    },
   
    img: {
        type: String
    },
   
});

ProductoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});



module.exports = model( 'Producto', ProductoSchema );