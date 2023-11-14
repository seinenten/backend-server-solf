const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    
    obtenerTablaDePosicionesPorLiga,
    obtenerTablaDePosicionesPorEquipo,
    obtenerTablaDePosicionesPorLigaYTemporada,
    obtenerTablaDePosicionesActualPorLiga
   
} = require('../controllers/posicion');

const router = Router();

// Ruta: POST /posiciones
// Crear una nueva posición


// Ruta: GET /posiciones
// Obtener todas las posiciones
router.get('/:idLiga', obtenerTablaDePosicionesPorLiga);

router.get('/Equipo/:idEquipo', obtenerTablaDePosicionesPorEquipo);
 
router.get('/:idLiga/:temporada', obtenerTablaDePosicionesPorLigaYTemporada);


router.get('/Actual/:idLiga', obtenerTablaDePosicionesActualPorLiga);

// Ruta: PUT /posiciones/:id
// Actualizar una posición por su ID


// Ruta: DELETE /posiciones/:id
// Eliminar una posición por su ID

module.exports = router;
