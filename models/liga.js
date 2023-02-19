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
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

LigaSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Liga', LigaSchema );