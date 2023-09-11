const { Schema, model } = require('mongoose');

const EquipoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    descanso: {
        type: Boolean,
        default: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    liga: {
        type: Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    }

});

EquipoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Equipo', EquipoSchema );