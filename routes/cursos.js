// ruta: /routes/cursos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {
    actualizarCurso,
    crearCurso,
    eliminarCurso,
    getCursos,
    getCursosPorNombre
} = require('../controllers/cursos')

const router = Router();


router.get('/', getCursos);

router.get('/nombre/:nombre', getCursosPorNombre);

router.post('/',
    [
        validarJWT,
        check('nombre', 'el Nombre es necesario').not().isEmpty(),
        check('descripcion', 'la Descripcion es necesaria').not().isEmpty(),
        check('precio', 'el precio es necesario').not().isEmpty(),
        validarCampos
    ],
    crearCurso
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'el Nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarCurso
);

router.delete( '/:id' , 
    [
        validarJWT, 
        validarADMIN_ROLE 
    ], 
    eliminarCurso
);



module.exports = router;