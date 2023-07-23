const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    getJornadasEnfrentamientos,
    crearJornadaEnfrentamiento,
    actualizarJornadaEnfrentamiento,
    eliminarJornadaEnfrentamiento,
    getJornadasPorliga,
    getJornadasenfrentamientosPorliga
} = require('../controllers/jornadas');

const router = Router();

// Ruta: GET /jornadas-enfrentamientos
// Obtener todas las jornadas de enfrentamientos
router.get('/', getJornadasEnfrentamientos);

router.get('/liga/:id', getJornadasPorliga)

router.get('/enfrentamientos/liga/:id', getJornadasenfrentamientosPorliga)
// Ruta: POST /jornadas-enfrentamientos
// Crear una nueva jornada de enfrentamiento
router.post(
    '/',
    [
        validarJWT,



        validarADMIN_ROLE,

        validarCampos
    ],
    crearJornadaEnfrentamiento
);

// Ruta: PUT /jornadas-enfrentamientos/:id
// Actualizar una jornada de enfrentamiento por su ID
router.put(
    '/:id',
    [
        validarJWT,
        validarADMIN_ROLE,

        validarCampos
    ],
    actualizarJornadaEnfrentamiento
);

// Ruta: DELETE /jornadas-enfrentamientos/:id
// Eliminar una jornada de enfrentamiento por su ID
router.delete('/:id', [validarJWT, validarADMIN_ROLE], eliminarJornadaEnfrentamiento);

module.exports = router;
