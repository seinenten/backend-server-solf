const { Schema, model } = require('mongoose');

const cursoSchema = Schema({

    nombre: {
        type: String,
        required: true    
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },


}, { collection: 'cursos'});

cursoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});

module.exports = model( 'Curso', cursoSchema );