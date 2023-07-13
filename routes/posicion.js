const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    crearPosicion,
    getPosiciones,
    getPosicionPorId,
    actualizarPosicion,
    eliminarPosicion,
    getPosicionesPornombre
} = require('../controllers/posicion');

const router = Router();

// Ruta: POST /posiciones
// Crear una nueva posición
router.post(
    '/',
    [
        validarJWT,
        check('equipo', 'El ID del equipo es obligatorio').not().isEmpty(),
        check('PJ', 'El valor de PJ es obligatorio').not().isEmpty(),
        check('PG', 'El valor de PG es obligatorio').not().isEmpty(),
        check('PE', 'El valor de PE es obligatorio').not().isEmpty(),
        check('PP', 'El valor de PP es obligatorio').not().isEmpty(),
        check('GF', 'El valor de GF es obligatorio').not().isEmpty(),
        check('GC', 'El valor de GC es obligatorio').not().isEmpty(),
        check('DIF', 'El valor de DIF es obligatorio').not().isEmpty(),
        check('EF', 'El valor de EF es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearPosicion
);

// Ruta: GET /posiciones
// Obtener todas las posiciones
router.get('/:ligaId', getPosiciones);

router.get('/nombre/:nombre', getPosicionesPornombre);

// Ruta: PUT /posiciones/:id
// Actualizar una posición por su ID
router.put(
    '/:id',
    [
        validarJWT,
        validarADMIN_ROLE,
        check('equipo', 'El ID del equipo es obligatorio').not().isEmpty(),
        check('PJ', 'El valor de PJ es obligatorio').not().isEmpty(),
        check('PG', 'El valor de PG es obligatorio').not().isEmpty(),
        check('PE', 'El valor de PE es obligatorio').not().isEmpty(),
        check('PP', 'El valor de PP es obligatorio').not().isEmpty(),
        check('GF', 'El valor de GF es obligatorio').not().isEmpty(),
        check('GC', 'El valor de GC es obligatorio').not().isEmpty(),
        check('DIF', 'El valor de DIF es obligatorio').not().isEmpty(),
        check('EF', 'El valor de EF es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPosicion
);

// Ruta: DELETE /posiciones/:id
// Eliminar una posición por su ID
router.delete('/:id', [validarJWT, validarADMIN_ROLE], eliminarPosicion);

module.exports = router;
