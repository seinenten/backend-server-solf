const { Router } = require('express');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const { 
    GenerarstadisticasJugadorPorEnfrentamientos,
    obtenerTablaDePosiciones
} = require('../controllers/estadisticasJugadores')

const router = Router();

router.get('/verEstadisticas/:fecha/:id', GenerarstadisticasJugadorPorEnfrentamientos);

router.get('/tablaPos/:idLiga', obtenerTablaDePosiciones);

module.exports = router;
