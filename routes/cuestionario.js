// ruta: /routes/cuestionario

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    crearPregunta,
    getPreguntas,
    getRespuestasPorIdPregunta
} = require('../controllers/cuestionario')

const router = Router();


router.get('/', getPreguntas );

router.get('/respuestas/:id', getRespuestasPorIdPregunta);

router.post('/',
    [
        validarJWT,
        check('pregunta', 'La pregunta es necesaria').not().isEmpty(),
        validarCampos,
        validarADMIN_ROLE
    ],
    crearPregunta
);



module.exports = router;