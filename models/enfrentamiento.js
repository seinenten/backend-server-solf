const { Schema, model } = require('mongoose');

const EnfrentamientoSchema = Schema({

    jornada: {
        type: Schema.Types.ObjectId,
        ref: 'Jornada',
        required: true
    },
    
    equipoLocal: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    
    equipoVisitante: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required:true
    },

    fecha: {
        type: Date
    }
    
    //? estadio: { }
})

EnfrentamientoSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});

module.exports = model('Enfrentamientos', EnfrentamientoSchema);