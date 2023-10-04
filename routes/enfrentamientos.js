const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    generarEnfrentamientosPorLiga,
    getEnfrentamientosPorLiga,
    getEnfrentamientos,
    ActualizarEnfrentamientos,
    getEnfrentamientosPorLigaActuales,
    obtenerPartidosDeEquipoActuales,
    obtenerPartidosDeEquipo,
    getJornadasPorFechaDeGeneracion,
    buscarPorFechaDeGeneracion,
    getEnfrentamientoPorId,
    getJornadasPorFechaDeGeneracionYLiga
} = require('../controllers/enfrentamientos')


const router = Router();

router.get('/liga/:ligaId' , generarEnfrentamientosPorLiga);

router.get('/:id', getEnfrentamientosPorLiga);

router.get('/actuales/:id', getEnfrentamientosPorLigaActuales);

router.get('/grupoJornadas/:id', getJornadasPorFechaDeGeneracion);

router.get('/', getEnfrentamientos); 

router.get('/partidosEquipoActuales/:id', obtenerPartidosDeEquipoActuales);

router.get('/partidosEquipo/:id', obtenerPartidosDeEquipo);

router.get('/buscar/:fecha/:id', buscarPorFechaDeGeneracion);

router.get('/enfrentamiento/:id', getEnfrentamientoPorId);

router.get('/buscarTempLiga/:temp/:id', getJornadasPorFechaDeGeneracionYLiga);


router.patch('/:id',[
    validarJWT,
    check('fechaDeGeneracion', 'la fecha es necesaria').not().isEmpty(),
    check('estadio', 'el estadio es necesario').not().isEmpty(),
],  ActualizarEnfrentamientos);


module.exports = router;