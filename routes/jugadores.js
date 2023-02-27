// ruta: /routes/equipos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    ActualizarJugador,
    CrearJugador,
    eliminarJugador,
    getJugadores,    
} = require('../controllers/jugadores')

const router = Router();


router.get( '/'  ,getJugadores );

router.post( '/', 
    [  
        validarJWT,
        check('nombre', 'el Nombre es necesario').not().isEmpty(),
        check('apellidoP', 'el Apellido Paterno es necesario').not().isEmpty(),
        check('apellidoM', 'el Apellido Materno es necesario').not().isEmpty(),
        check('curp', 'la curp es necesaria').not().isEmpty(),
        check('liga','El id de la Liga debe de ser valido').isMongoId(),
        check('equipo','El id del equipo debe de ser valido').isMongoId(),
        validarCampos
    ],
    CrearJugador
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'el Nombre es necesario').not().isEmpty(),
        check('apellidoP', 'el Apellido Paterno es necesario').not().isEmpty(),
        check('apellidoM', 'el Apellido Materno es necesario').not().isEmpty(),
        check('curp', 'la curp es necesaria').not().isEmpty(),
        check('liga','El id de la Liga debe de ser valido').isMongoId(),
        check('equipo','El id del equipo debe de ser valido').isMongoId(),
        validarCampos
    ], 
    ActualizarJugador
);

router.put( '/desactivar/:id' ,[
    validarJWT,
    check('status' , 'El status es obligatorio').not().isEmpty(),
    validarCampos
], eliminarJugador );



module.exports = router;