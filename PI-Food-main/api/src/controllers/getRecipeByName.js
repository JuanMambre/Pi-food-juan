const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?api_Key=${API_KEY}&number=100`;

const getRecipeByName = async (req, res) => {
  try {
    const { Nombre } = req.query;
    const { data } = await axios.get(`${URL}/${Nombre}`);

    const recipe = {
      id: data?.id,
      Nombre: data.Nombre,
      Descripcion: data.Descripcion,
      Nivel: data.NivelDeSalud,
      Pasos: data.Pasos,
    };
    return recipe.id
      ? res.status(200).json(recipe)
      : res.status(404).json('Not found!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecipeByName,
};
