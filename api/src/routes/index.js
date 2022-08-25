const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { getDogAll }  = require('../controllers/controllersApi');

const routerAllDogs = require('./Dogs');
const routerAllTemperaments = require('./Temperaments');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', routerAllDogs);
router.use('/temperament', routerAllTemperaments);

module.exports = router;

