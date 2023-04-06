
    // Ruta: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');


const { getUsuarios,getUsuariosporStatusFalse, getUsuariosporStatusTrue,crearUsuario, actualizarUsuario, eliminarUsuario, getEmails } = require('../controllers/usuarios');

const { enviarCorreo, verificarEmail } = require('../controllers/recuperarPassword');
const { preguntaSecreta } = require('../controllers/recuperarPassword');

const router = Router();


router.get( '/' , validarJWT , getUsuarios );

router.get( '/:email'  , getEmails );


router.get( '/statusfalse', validarJWT  , getUsuariosporStatusFalse );

router.get( '/statustrue', validarJWT  , getUsuariosporStatusTrue );

//recuperar password por email
router.post('/recuperar', enviarCorreo)
//recuperar password por pregunta secreta
router.post('/preguntaSecret', preguntaSecreta)
// confirmar cuenta

router.get('/confirmar/:id',verificarEmail)

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
        validarADMIN_ROLE_o_MismoUsuario,
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
    validarADMIN_ROLE,
    check('status' , 'El status es obligatorio').not().isEmpty(),
    validarCampos
]  , eliminarUsuario );



module.exports = router;