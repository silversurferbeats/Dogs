const {Router} =  require('express');
const { getTemperamets } = require('../controllers/ControllersApi');
const router = Router()

// RUTA
router.get('/', getTemperamets)

module.exports = router;