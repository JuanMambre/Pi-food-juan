const axios = require('axios');
const { Op } = require('sequelize');
const { Recipe, Diets } = require('../db');

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&number=100`
  );

  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      steps: e.analyzedInstructions[0]?.steps.map((element) => {
        return {
          number: element.number,
          step: element.step,
        };
      }),
      dietTypes: e.diets,
      image: e.image,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
};

const getApiById = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
  );
};

const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diets,
    },
  });
};

const getAll = async (id) => {
  if (isNaN(id)) {
    let dbData = await Recipe.findByPk(id, {
      where: {
        id: {
          [Op.iLike]: `%${id}%`,
        },
      },
      include: {
        model: Diets,
      },
    });
    return dbData ? dbData.toJSON() : null;
  } else {
    let apiData = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    return apiData;
  }
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getApiById,
  getDbById,
  getAll,
};
