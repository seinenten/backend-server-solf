// ruta: /routes/estadios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');


const {
    
    crearComentarios,
    getComentarios,
 
} = require('../controllers/comentario')


const router = Router();


router.get( '/'  , getComentarios );




router.post( '/', 
    [  
       
        
    ],
    crearComentarios
);



module.exports = router;
