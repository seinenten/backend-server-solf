const { Router } = require('express');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const { 
    GenerarstadisticasJugadorPorEnfrentamientos,
    getEstadisticasPorLiga,
    getEstadisticasPorLigaTemp,
    
    getEstadisticasPorLigaEsActual,
    terminarLasEstadisticasJugadores
} = require('../controllers/estadisticasJugadores')

const router = Router();

router.get('/generarEstadisticas/:fecha/:id', GenerarstadisticasJugadorPorEnfrentamientos);

router.get('/verEstadisticasLiga/:id', getEstadisticasPorLiga);

router.get('/verEstadisticasLigaTemp/:temp/:id', getEstadisticasPorLigaTemp );

router.get('/verEstadisticasLigaActuales/:id',getEstadisticasPorLigaEsActual );

router.get('/terminarEstadisticasJugadorAc/:temp/:id',terminarLasEstadisticasJugadores );



module.exports = router;
