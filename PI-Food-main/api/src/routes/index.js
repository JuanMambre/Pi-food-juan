const { Router } = require('express');

const recipeRouter = require('./recipesRouter');
const { dietRouter } = require('./dietRouter');

const router = Router();
router.use('/recipes', recipeRouter);

router.use('/', dietRouter);

module.exports = router;
