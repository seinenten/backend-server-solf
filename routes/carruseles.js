// ruta: /routes/carruseles

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    ActualizarCarrusel,
    CrearCarrusel,
    getCarrusel,
    getCarruselPorId,
    eliminarCarrusel
} = require('../controllers/carruseles')

const router = Router();


router.get( '/'  , getCarrusel );

router.get( '/:id'  , getCarruselPorId );

router.post( '/', 
    [  
        validarJWT,
        validarADMIN_ROLE,
        check('img', 'La imagen del carrusel es necesaria').not().isEmpty(),
        validarCampos
    ],
    CrearCarrusel
);

router.put( '/:id', 
    [
        validarJWT,
        validarADMIN_ROLE,
        check('img', 'La imagen del carrusel es necesaria').not().isEmpty(),
        validarCampos
    ], 
    ActualizarCarrusel 
);

router.delete( '/:id' , 
                [
                    validarJWT, 
                    validarADMIN_ROLE 
                ], eliminarCarrusel );





module.exports = router;