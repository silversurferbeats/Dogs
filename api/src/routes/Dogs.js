const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    getDogAll, 
    getApiId, 
    postDog
} = require('../controllers/ControllersApi');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', getDogAll);
router.get('/:id', getApiId);
router.post('/', postDog);

module.exports = router;

