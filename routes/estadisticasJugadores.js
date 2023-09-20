const { Router } = require('express');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const { 
    GenerarstadisticasJugadorPorEnfrentamientos
} = require('../controllers/estadisticasJugadores')

const router = Router();

router.get('/verEstadisticas/:fecha/:id', GenerarstadisticasJugadorPorEnfrentamientos);

module.exports = router;
