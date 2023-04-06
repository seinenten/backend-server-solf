const { Schema, model } = require('mongoose');

const RespaldoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    accion: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    }
 
});

RespaldoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Respaldo', RespaldoSchema );