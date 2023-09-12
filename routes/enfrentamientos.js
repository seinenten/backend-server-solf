const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    generarEnfrentamientosPorLiga,
    getEnfrentamientosPorLiga,
    getEnfrentamientos,
    ActualizarEnfrentamientos,
    getEnfrentamientosPorLigaActuales,
    obtenerGruposDeEnfrentamientosPorLiga
} = require('../controllers/enfrentamientos')


const router = Router();

router.get('/liga/:ligaId' , generarEnfrentamientosPorLiga);

router.get('/:id', getEnfrentamientosPorLiga);

router.get('/actuales/:id', getEnfrentamientosPorLigaActuales);

router.get('/grupos/:id', obtenerGruposDeEnfrentamientosPorLiga);

router.get('/', getEnfrentamientos); 

router.patch('/:id',[
    validarJWT,
    check('fechaDeGeneracion', 'la fecha es necesaria').not().isEmpty(),
    check('estadio', 'el estadio es necesario').not().isEmpty(),
],  ActualizarEnfrentamientos);


module.exports = router;