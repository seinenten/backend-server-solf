// ruta: /routes/preguntas

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    actualizarPregunta,
    crearPregunta,
    getPreguntas,
    getPreguntasPorId
} = require('../controllers/preguntas')

const router = Router();


router.get( '/'  ,getPreguntas );

router.get( '/:id'  , getPreguntasPorId );

router.post( '/', 
    [  
        validarJWT,
        validarADMIN_ROLE,
        check('pregunta', 'la pregunta es necesaria').not().isEmpty(),
        validarCampos
    ],
    crearPregunta
);

router.put( '/:id', 
    [
        validarJWT,
        validarADMIN_ROLE,
        check('pregunta', 'la pregunta es necesaria').not().isEmpty(),
        validarCampos
    ], 
    actualizarPregunta
);



module.exports = router;