const { Schema, model } = require('mongoose');

const EstadisticasJugadorSchema = Schema({ 

    jugador: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true
    },

    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },

    liga: {
        type: Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    },

    goles: {
        type: Number,
        default: 0
    },

    faltas: {
        type: Number,
        default: 0
    },

    expulsiones: {
        type: Number,
        default: 0
    },

    temporada: {  //entiendase que es la fechaDeGenaracion de una liga
        type: Date,
        required: true
    },

    esActual: {
        type: Boolean,
        required: true 
    },


});

EstadisticasJugadorSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'EstadisticaJugador', EstadisticasJugadorSchema );
