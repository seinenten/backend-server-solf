
    // Ruta: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getUsuarios,getUsuariosporStatusFalse, getUsuariosporStatusTrue,crearUsuario, actualizarUsuario, eliminarUsuario,  } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', validarJWT  , getUsuarios );


router.get( '/statusfalse', validarJWT  , getUsuariosporStatusFalse );

router.get( '/statustrue', validarJWT  , getUsuariosporStatusTrue );




router.post( '/', 
    [  
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidoP', 'El apellido paterno es obligatorio').not().isEmpty(),
        check('apellidoM', 'El apellido materno es obligatorio').not().isEmpty(),
        check('password' , 'El nombre es obligatorio').not().isEmpty(),
        check('email' , 'El nombre es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidoP', 'El apellido paterno es obligatorio').not().isEmpty(),
        check('apellidoM', 'El apellido materno es obligatorio').not().isEmpty(),
        check('email' , 'El nombre es obligatorio').isEmail(),
        check('role' , 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    actualizarUsuario 
);

router.put( '/desactivar/:id' ,[
    validarJWT,
    check('status' , 'El status es obligatorio').not().isEmpty(),
    validarCampos
]  , eliminarUsuario );



module.exports = router;