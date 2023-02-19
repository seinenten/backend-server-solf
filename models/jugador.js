const { Schema, model } = require('mongoose');

const jugadorSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    apellidoP:{
        type: String,
        required: true,
    },
    apellidoM:{
        type: String,
        required: true,
    },
    curp:{
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    liga: {
        type: Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    },
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },

//colocar un nombre a la collection para que no diga jugadors
}, { collection: 'jugadores' } );

jugadorSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Jugador', jugadorSchema );