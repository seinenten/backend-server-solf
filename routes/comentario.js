// ruta: /routes/estadios

const { Router } = require('express');

const {
    
    crearComentarios,
    getComentarios,
 
} = require('../controllers/comentario')


const router = Router();


router.get( '/'  , getComentarios );

router.post( '/', 
   
    crearComentarios
);



module.exports = router;
