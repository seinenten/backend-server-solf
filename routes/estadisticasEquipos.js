const { Router } = require('express');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const { 
    
    obtenerEstadisticasPorEquipo,
    obtenerEstadisticasPorLiga,
    obtenerEstadisticasPorLigaYTemporada,
    getEstadisticasPorEquipoLigaEsActual,
    terminarLasEstadisticasEquipos

} = require('../controllers/estadisticasEquipos')

const router = Router();



router.get('/estadisticasEquiposLiga/:idLiga', obtenerEstadisticasPorLiga);

router.get('/estadisticasEquipo/:idEquipo', obtenerEstadisticasPorEquipo);

router.get('/estadisticasPorliga/:idLiga/:temporada', obtenerEstadisticasPorLigaYTemporada);

router.get('/estadisticasPoresActual/:idLiga', getEstadisticasPorEquipoLigaEsActual);


router.get('/terminarEstadisticasEquipos/:temp/:id', terminarLasEstadisticasEquipos);


module.exports = router;
