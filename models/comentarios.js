const { Schema, model } = require('mongoose');

const ComentarioSchema = Schema({

    id: {
        type: String,
        
    },
    autor: {
        type: String,
        require: true
    },

    contenido: {
        type: String,
        required: true,
    },
     
    fecha: {
        type: Date
    },
   
});

ComentarioSchema.method('toJSON', function () {
    const { __v , ...object } = this.toObject();

    return object;
});


module.exports = model( 'Comentario', ComentarioSchema );
