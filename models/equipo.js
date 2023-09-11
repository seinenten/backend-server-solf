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

// Agregar un campo "descanso" para identificar equipos de descanso
EquipoSchema.add({
    descanso: {
        type: Boolean,
        default: false
    }
});

EquipoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Equipo', EquipoSchema );