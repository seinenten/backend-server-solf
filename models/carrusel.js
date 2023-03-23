const { Schema, model } = require('mongoose');

const CarruselSchema = Schema({

    img: {
       
        type: String
    },
    nombre: {
        type:String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'carruseles' });

CarruselSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Carrusel', CarruselSchema );