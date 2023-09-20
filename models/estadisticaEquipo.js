const { Schema, model } = require('mongoose');

const EstadisticasEquipoSchema = Schema({ 


    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
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

    temporada: {  //entiendase que es la fechaDeGenaracion de una liga no la elimines
        type: Date,
        required: true
    },

    esActual: { // no la elimines
        type: Boolean,
        required: true 
    },


});

EstadisticasJugadorSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'EstadisticaEquipo', EstadisticasEquipoSchema );