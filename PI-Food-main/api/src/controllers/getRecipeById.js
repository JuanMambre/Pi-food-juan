const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.spoonacular.com/recipes/:${id}/complexSearch?apiKey=${API_KEY}&number=100`;
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${URL}/${id}`);

    const recipe = {
      id: data.id,
      Nombre: data.Nombre,
      Descripcion: data.Descripcion,
      Nivel: data.NivelDeSalud,
      Pasos: data.Pasos,
      apiKey: { API_KEY },
    };
    return recipe.id
      ? res.status(200).json(recipe)
      : res.status(404).json('Not found!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

mnodule.exports = {
  getRecipeById,
};
