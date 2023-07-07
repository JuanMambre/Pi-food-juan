const { Router } = require('express');
const { Diets } = require('../db');
const { default: axios } = require('axios');
const dietRouter = Router();

dietRouter.get('/diet', async (req, res) => {
  //funciona
  try {
    const tipoDieta = await Diets.findAll();
    if (tipoDieta.length > 0) {
      res.status(200).json(tipoDieta);
    } else {
      let recipes = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&number=100`
      );
      const diets = recipes.data.results.flatMap((e) => e.diets); //array
      for (let i = 0; i < diets.length; i++) {
        Diets.findOrCreate({
          where: {
            name: diets[i],
          },
        });
      }

      const tiposDietaActualizados = await Diets.findAll();
      res.status(200).json(tiposDietaActualizados);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  dietRouter,
};
