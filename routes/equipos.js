// ruta: /routes/jugadores

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    ActualizarEquipo,
    CrearEquipo,
    eliminarEquipo,
    getEquipos,
    getEquiposPorId,
    getEquiposPorStatusFalse,
    getEquiposPorStatusTrue
} = require('../controllers/equipos')

const router = Router();


router.get( '/'  ,getEquipos );

router.get( '/statusFalse',getEquiposPorStatusFalse );

router.get( '/statusTrue',getEquiposPorStatusTrue );

router.get( '/:id'  , getEquiposPorId );

router.post( '/', 
    [  
        validarJWT,
        check('nombre', 'el Nombre del equipo es necesario').not().isEmpty(),
        check('descripcion', 'la Descripcion del equipo es necesaria').not().isEmpty(),
        check('liga','El id de la Liga debe de ser valido').isMongoId(),
        validarCampos
    ],
    CrearEquipo
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'el Nombre del equipo es necesario').not().isEmpty(),
        check('descripcion', 'la Descripcion del equipo es necesaria').not().isEmpty(),
        check('liga','El id de la Liga debe de ser valido').isMongoId(),
        validarCampos
    ], 
    ActualizarEquipo 
);

router.put( '/desactivar/:id' , [
    validarJWT,
    validarADMIN_ROLE,
    check('status' , 'El status es obligatorio').not().isEmpty(),
    validarCampos
], eliminarEquipo );



module.exports = router;