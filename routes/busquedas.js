// Ruta: /api/todo/

const { Router } = require('express');


const { busquedaTotal, getDocumentosColeccion,busquedaQ } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


 router.get( '/:busqueda'  ,  busquedaTotal );

router.get( '/:q'  ,  busquedaQ );

 router.get( '/coleccion/:tabla/:busqueda', validarJWT  ,  getDocumentosColeccion );


module.exports = router;