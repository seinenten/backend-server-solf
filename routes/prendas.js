// ruta: /routes/prendas

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const {
    ActualizarPrenda,
    CrearPrenda,
    eliminarPrenda,
    getPrendas,
    getPrendasPorId
} = require('../controllers/prendas')

const router = Router();


router.get( '/'  , getPrendas );

router.get( '/:id'  , getPrendasPorId );

router.post( '/', 
    [  
        check('nombre', 'el nombre de la prenda es necesario').not().isEmpty(),
        check('descripcion', 'la descripcion de la prenda es necesario').not().isEmpty(),
        check('talla', 'la talla de la prenda es necesaria').not().isEmpty(),
        check('precio', 'el precio de la prenda es necesaria').not().isEmpty(),
        validarCampos
    ],
    CrearPrenda
);

router.put( '/:id', 
    [
        check('nombre', 'el nombre de la prenda es necesario').not().isEmpty(),
        check('descripcion', 'la descripcion de la prenda es necesario').not().isEmpty(),
        check('talla', 'la talla de la prenda es necesaria').not().isEmpty(),
        check('precio', 'el precio de la prenda es necesaria').not().isEmpty(),
        validarCampos
    ], 
    ActualizarPrenda 
);

router.delete( '/:id' , 
    
    eliminarPrenda
    
);



module.exports = router;