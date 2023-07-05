const { Schema, model } = require('mongoose');

const PosicionSchema = Schema({
  equipo: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true,
  },
  PJ: {
    type: Number,
    required: true,
  },
  PG: {
    type: Number,
    required: true,
  },
  PE: {
    type: Number,
    required: true,
  },
  PP: {
    type: Number,
    required: true,
  },
  GF: {
    type: Number,
    required: true,
  },
  GC: {
    type: Number,
    required: true,
  },
  DIF: {
    type: Number,
    required: true,
  },
  EF: {
    type: Number,
    required: true,
  },
});

module.exports = model('Posicion', PosicionSchema);
