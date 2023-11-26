const express = require('express')
const router = express.Router()

const { getItem } = require('../controllers/getItem')
const { postItem } = require('../controllers/postItem')
const { updateItem } = require('../controllers/updateItem')
const { checkItem } = require('../controllers/checkItem') 

//TODO:(1) Genarar nueva orden!

router.post('/', postItem)

//TODO:(2) Obtener el detalle de una orden

router.get('/:id', getItem)

//TODO:(3) Generar intencion de pago

router.patch('/:id', updateItem)

//TODO:(4) Confirmar estatus del pago

router.patch('/confirm/:id', checkItem)

module.exports = router