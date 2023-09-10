const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    generarEnfrentamientosPorLiga,
    getEnfrentamientosPorLiga,
    getEnfrentamientos,
    ActualizarEnfrentamientos
} = require('../controllers/enfrentamientos')


const router = Router();

router.get('/liga/:ligaId' , generarEnfrentamientosPorLiga);

router.get('/:id', getEnfrentamientosPorLiga);

router.get('/', getEnfrentamientos);

router.patch('/:id',[
    validarJWT,
    check('fecha', 'la fecha es necesaria').not().isEmpty(),
    check('estadio', 'el estadio es necesario').not().isEmpty(),
],  ActualizarEnfrentamientos);


module.exports = router;