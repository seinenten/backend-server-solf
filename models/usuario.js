const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    apellidoP: {
        type: String,
        required: true,
    },
    apellidoM: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    pregunta: {
        type: Schema.Types.ObjectId,
        ref: 'Pregunta',
    },
    respuesta: {
        type: String,
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
    ligasDisp:{
        type: Number,
        default: 1    
    }
});

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;

    return object;
});


module.exports = model( 'Usuario', UsuarioSchema );