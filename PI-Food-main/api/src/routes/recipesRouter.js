const { Router } = require('express');
const {
  getDbById,
  getApiById,
  getDbInfo,
  getApiInfo,
  getAll,
} = require('../controllers/recipe');
const { Recipe, Diets } = require('../db');
const { default: axios } = require('axios');
const { Op } = require('sequelize');

const recipeRouter = Router();

recipeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes('-')) {
      let dbRecipeInfo = await getDbById(id);
      return res.status(200).json(dbRecipeInfo);
    } else {
      apiRecipeInfo = await getApiById(id);
      if (apiRecipeInfo.data.id) {
        let recipeDetails = {
          id: apiRecipeInfo.data.id,
          name: apiRecipeInfo.data.title,
          summary: apiRecipeInfo.data.summary,
          healthScore: apiRecipeInfo.data.healthScore,
          steps: apiRecipeInfo.data.analyzedInstructions[0]?.steps.map(
            (element) => {
              return {
                number: element.number,
                step: element.step,
              };
            }
          ),
          dietTypes: apiRecipeInfo.data.diets,
          image: apiRecipeInfo.data.image,
        };
        return res.status(200).send(recipeDetails);
      }
    }
  } catch (err) {
    return res.status(404).send(err);
  }
});

//=========================================
recipeRouter.get('/', async (req, res) => {
  const { name } = req.query;

  const apiData = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&number=100`
  );

  const apiDataRes = apiData.data.results;
  const dbData = await getDbInfo();
  const totalData = apiDataRes.concat(dbData);

  try {
    if (name) {
      let filteredRecipe = totalData.filter((r) =>
        r.title.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredRecipe.length > 0) {
        res.status(200).send(filteredRecipe);
      } else {
        res.status(400).send('Recipe not found.');
      }
    } else {
      res.status(200).json(totalData);
    }
  } catch (err) {
    console.error(err);
  }
});

//====================

recipeRouter.post('/create', async (req, res) => {
  //funciona
  try {
    const { title, summary, healthScore, steps, image, dietTypes } = req.body;
    if (title && summary && healthScore && steps && image && dietTypes) {
      const newRecipe = await Recipe.create({
        title,
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
    return res.status(500).send(error);
  }
});

module.exports = recipeRouter;
