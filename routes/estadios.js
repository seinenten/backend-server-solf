// ruta: /routes/estadios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');


const {
    actualizarEstadio,
    crearEstadio,
    getEstadios,
    getEstadiosPorId
} = require('../controllers/estadios')


const router = Router();


router.get( '/'  , getEstadios );

router.get( '/:id'  , getEstadiosPorId );


router.post( '/', 
    [  
        validarJWT,
        validarADMIN_ROLE,
        check('nombre', 'el nombre de la liga es necesario').not().isEmpty(),
        check('direccion', 'el tipo de juego de la liga es necesario').not().isEmpty(),
        validarCampos
    ],
    crearEstadio
);

router.put( '/:id', 
    [
        validarJWT,
        validarADMIN_ROLE,
        check('nombre', 'el nombre de la liga es necesario').not().isEmpty(),
        check('direccion', 'el tipo de juego de la liga es necesario').not().isEmpty(),
        validarCampos
    ], 
    actualizarEstadio 
);


module.exports = router;
