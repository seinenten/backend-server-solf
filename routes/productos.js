// ruta: /routes/estadios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');


const {
    actualizarProductos,
    crearProductos,
    getProductos,
    getProductosPorId
} = require('../controllers/productos')


const router = Router();


router.get( '/'  , getProductos );

router.get( '/:id'  , getProductosPorId );


router.post( '/', 
    [  
       
        
    ],
    crearProductos
);

router.put( '/:id', 
    [
        
       
    ], 
    actualizarProductos 
);


module.exports = router;
