// Ruta: /api/upload/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');
const {  retornaImagen, fileUploadCloudinary } = require('../controllers/uploads');
const { restaurarBD, copiaBD } = require('../controllers/resataurarBD');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.use(expressFileUpload());

router.put( '/:tipo/:id', validarJWT  , fileUploadCloudinary  );

router.get( '/:tipo/:foto',   retornaImagen  );

router.get('/copia',validarJWT,copiaBD)

router.get('/restaurar',validarJWT,restaurarBD)

module.exports = router;