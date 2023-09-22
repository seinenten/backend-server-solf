const { Router } = require('express');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const { 
    obtenerTablaDePosiciones,
   

} = require('../controllers/tablaPosiciones')

const router = Router();

//Generar tabla de posiciones 
router.post('/:idLiga', obtenerTablaDePosiciones,
validarADMIN_ROLE, validarJWT);


module.exports = router;
