const {Router} =  require('express');
const { funcionTemperament } = require('../controllers/ControllersApi');
const router = Router()

// RUTA
router.get('/', funcionTemperament)

module.exports = router;