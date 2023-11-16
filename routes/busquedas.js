// Ruta: /api/todo/

const { Router } = require('express');


const { busquedaTotal, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/:busqueda' , busquedaTotal );

router.get( '/coleccion/:tabla/:busqueda'  ,  getDocumentosColeccion );


module.exports = router;