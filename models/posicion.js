const { Schema, model } = require('mongoose');
const Equipo = require('./equipo');

const PosicionSchema = Schema({
  liga: {
    type: Schema.Types.ObjectId,
    ref: 'Liga',
    required: true,
    unique: true,
  },
  posiciones: [
    {
      equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true,
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
    },
  ],
});

PosicionSchema.virtual('posiciones.equipoNombre', {
  ref: 'Equipo',
  localField: 'posiciones.equipo',
  foreignField: '_id',
  justOne: true,
  autopopulate: true, // Agrega esta línea para activar la opción de autopopulación
});

PosicionSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.posiciones.forEach((posicion) => {
      if (posicion.equipoNombre) {
        posicion.equipo = posicion.equipoNombre.nombre;
        delete posicion.equipoNombre;
      }
    });
  },
});

module.exports = model('Posicion', PosicionSchema);
