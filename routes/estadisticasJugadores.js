const { Router } = require('express');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const { 
    GenerarstadisticasJugadorPorEnfrentamientos,
    getEstadisticasPorLiga,
    getEstadisticasPorLigaTemp,
    obtenerTablaDePosiciones
} = require('../controllers/estadisticasJugadores')

const router = Router();

router.get('/generarEstadisticas/:fecha/:id', GenerarstadisticasJugadorPorEnfrentamientos);

router.get('/verEstadisticasLiga/:id', getEstadisticasPorLiga);

router.get('/verEstadisticasLigaTemp/:temp/:id', getEstadisticasPorLigaTemp );

// router.get('/generarEstadisticas/:fecha/:id', );

// router.get('/generarEstadisticas/:fecha/:id', );

router.get('/tablaPos/:idLiga', obtenerTablaDePosiciones);

module.exports = router;
