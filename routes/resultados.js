const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    crearResultado,
    obtenerResultados,
    actualizarResultado,
    eliminarResultado
} = require('../controllers/resultados');

const router = Router();

// Ruta: POST /resultados
// Crear un nuevo resultado
router.post(
    '/',
    [
        validarJWT,
        validarADMIN_ROLE,
        check('resultados', 'Se requiere un arreglo de resultados').isArray(),
        check('resultados.*.equipoLocal', 'El ID del equipo local es obligatorio').not().isEmpty(),
        check('resultados.*.equipoVisitante', 'El ID del equipo visitante es obligatorio').not().isEmpty(),
        check('resultados.*.golesLocal', 'El valor de goles local es obligatorio').isInt(),
        check('resultados.*.golesVisitante', 'El valor de goles visitante es obligatorio').isInt(),
        validarCampos
    ],
    crearResultado);

// Ruta: GET /resultados
// Obtener todos los resultados
router.get('/', obtenerResultados,
);


// Ruta: PUT /resultados/:id
// Actualizar un resultado por su ID
router.put(
    '/:id',
    [
        validarJWT,
        validarADMIN_ROLE,
        check('golesLocal', 'El valor de goles local es obligatorio').isInt(),
        check('golesVisitante', 'El valor de goles visitante es obligatorio').isInt(),
        validarCampos
    ],
    actualizarResultado
);

// Ruta: DELETE /resultados/:id
// Eliminar un resultado por su ID
router.delete('/:id', [validarJWT, validarADMIN_ROLE], eliminarResultado);

module.exports = router;
