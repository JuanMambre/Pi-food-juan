const { Router } = require('express');
const { getDbById, getApiById, getDbInfo } = require('../controllers/recipe');
const { Recipe } = require('../db');
const { default: axios } = require('axios');

const recipeRouter = Router();

recipeRouter.get('/:id', async (req, res) => {
  //funciona
  const { id } = req.params;
  try {
    if (id.length > 10) {
      let dbId = await getDbById(id);
      return res.status(200).json(dbId);
    } else {
      let apiId = await getApiById(id);
      if (apiId.data.id) {
        let info = {
          id: apiId.data.id,
          name: apiId.data.title,
          summary: apiId.data.summary,
          healthScore: apiId.data.healthScore,
          steps: apiId.data.analyzedInstructions[0]?.steps.map((element) => {
            return {
              number: element.number,
              step: element.step,
            };
          }),
          dietTypes: apiId.data.diets,
          image: apiId.data.image,
        };
        return res.status(200).send(info);
      }
    }
  } catch {
    return res.status(404).send('Recipe not found!');
  }
});

recipeRouter.get('/', async (req, res) => {
  //funciona
  const { name } = req.query;

  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&number=100`
  );
  const recipes = response.data.results;

  const getAll = async () => {
    const dataBaseInfo = await getDbInfo();

    const total = recipes.concat(dataBaseInfo);

    return total;
  };
  try {
    if (name) {
      const allRecipe = await getAll();
      let recipe = allRecipe.filter(
        (recipe) => recipe.title.toLowerCase() === name.toLowerCase()
      );

      if (recipe) {
        let recipeMap1 = recipe.map((e) => {
          return {
            // id: e.id,
            name: e.title,
            dietTypes: e.diets,
            summary: e.summary,
            image: e.image,
            healthScore: e.healthScore,
          };
        });
        res.status(200).json(recipeMap1);
      } else {
        res.status(404).send('No recipe found.');
      }
    } else {
      let recipeMap2 = recipes.map((e) => {
        return {
          name: e.title,
          dietTypes: e.diets,
          summary: e.summary,
          image: e.image,
          healthScore: e.healthScore,
        };
      });
      res.status(200).json(recipeMap2);
    }
  } catch (error) {
    res.send(error);
  }
});

recipeRouter.post('/create', async (req, res) => {
  //funciona
  try {
    const { name, summary, healthScore, steps, image, dietTypes } = req.body;
    if (name && summary && healthScore && steps && image && dietTypes) {
      const newRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        steps,
        dietTypes,
        image,
      });
      let response = await newRecipe.setDiets(dietTypes);
      res.status(200).send(response);
    } else {
      return res.status(404).json('Error, missing data.');
    }
  } catch (error) {
    return res.send(error);
  }
});

module.exports = recipeRouter;
