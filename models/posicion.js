const { Schema, model } = require('mongoose');

const PosicionSchema = Schema({
  liga: {
    type: Schema.Types.ObjectId,
    ref: 'Liga',
    required: true,
    unique: true
  },
  posiciones: [
    {
      equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
      },
      PJ: {
        type: Number,
        default: 0
      },
      PG: {
        type: Number,
        default: 0
      },
      PE: {
        type: Number,
        default: 0
      },
      PP: {
        type: Number,
        default: 0
      },
      GF: {
        type: Number,
        default: 0
      },
      GC: {
        type: Number,
        default: 0
      },
      Puntos: {
        type: Number
      }
    }
  ]
});

module.exports = model('Posicion', PosicionSchema);
