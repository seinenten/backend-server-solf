// Ruta: /api/upload/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');
const {  retornaImagen, fileUploadCloudinary } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put( '/:tipo/:id', validarJWT  , fileUploadCloudinary  );

router.get( '/:tipo/:foto',   retornaImagen  );

module.exports = router;