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

    PJ: {
        type: Number,
        default: 0,
      },
      PG: {
        type: Number,
        default: 0,
      },
      PE: {
        type: Number,
        default: 0,
      },
      PP: {
        type: Number,
        default: 0,
      },
      GF: {
        type: Number,
        default: 0,
      },
      GC: {
        type: Number,
        default: 0,
      },
      Puntos: {
        type: Number,
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

EstadisticasEquipoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'EstadisticaEquipo', EstadisticasEquipoSchema );