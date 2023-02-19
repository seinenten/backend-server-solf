// Ruta: /api/todo/

const { Router } = require('express');


const { busquedaTotal, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/:busqueda', validarJWT  ,  busquedaTotal );

router.get( '/coleccion/:tabla/:busqueda', validarJWT  ,  getDocumentosColeccion );


module.exports = router;