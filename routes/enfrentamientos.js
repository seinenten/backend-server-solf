const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    generarEnfrentamientosPorLiga,
    getEnfrentamientosPorLiga,
    getEnfrentamientos
} = require('../controllers/enfrentamientos')


const router = Router();

router.get('/liga/:ligaId' , generarEnfrentamientosPorLiga);

router.get('/:id', getEnfrentamientosPorLiga);

router.get('/', getEnfrentamientos);

module.exports = router;