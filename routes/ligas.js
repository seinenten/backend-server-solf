// ruta: /routes/ligas

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    CrearLiga,
    ActualizarLiga,
    eliminarLiga,
    getLigas
} = require('../controllers/ligas')

const router = Router();


router.get( '/'  ,getLigas );

router.post( '/', 
    [  
        validarJWT,
        check('nombre', 'el nombre de la liga es necesario').not().isEmpty(),
        check('descripcion', 'la descripcion de la liga es necesario').not().isEmpty(),
        check('tipoCategoria', 'la categoria de la liga es necesario').not().isEmpty(),
        check('tipoJuego', 'el tipo de juego de la liga es necesario').not().isEmpty(),
        validarCampos
    ],
    CrearLiga
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'el nombre de la liga es necesario').not().isEmpty(),
        check('descripcion', 'la descripcion de la liga es necesario').not().isEmpty(),
        check('tipoCategoria', 'la categoria de la liga es necesario').not().isEmpty(),
        check('tipoJuego', 'el tipo de juego de la liga es necesario').not().isEmpty(),
        validarCampos
    ], 
    ActualizarLiga 
);

router.delete( '/:id' , eliminarLiga );



module.exports = router;