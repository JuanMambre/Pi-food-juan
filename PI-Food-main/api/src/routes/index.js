const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getRecipeById = require('../controllers/getRecipeById');

const router = Router();
Router.get('/recipes/:id', getRecipeById);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
