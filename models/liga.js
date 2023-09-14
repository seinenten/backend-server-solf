const { Schema, model } = require('mongoose');

const LigaSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    tipoCategoria: {
        type: String,
        required: true,
    },
    tipoJuego: {
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    edadMax: {
        required: true,
        type: Number
    },
    edadMin: {
        required: true,
        type: Number
    }

});

LigaSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Liga', LigaSchema );