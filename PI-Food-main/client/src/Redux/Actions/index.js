import axios from 'axios';

//============FUNCTION'S
export function getAllRecipes() {
  return async function (dispatch) {
    return await axios.get(`http://localhost:3001/recipes`).then((res) => {
      dispatch({
        type: 'GET_ALL_RECIPES',
        payload: res.data,
      });
    });
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: 'GET_RECIPES_BY_NAME',
        payload: res.data,
      });
    } catch (error) {
      alert('Whoops! The recipe could not be found.');
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    return await axios.get(`http://localhost:3001/diet`).then((res) => {
      dispatch({
        type: 'GET_ALL_DIET',
        payload: res.data,
      });
    });
  };
}

export function getRecipeId(id) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: 'GET_RECIPES_BY_ID',
        payload: res.data,
      });
    } catch (error) {
      alert('Whoops! The recipe could not be found.');
    }
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    try {
      let res = await axios.post(
        `http://localhost:3001/recipes/create`,
        payload
      );
      return dispatch({
        type: 'NEW_RECIPE',
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//============================FILTROS Y ORDENAMIENTOS

export function sortRecipesByName(sortType) {
  return {
    type: 'SORT_RECIPES_BY_NAME',
    payload: sortType,
  };
}

export function sortRecipesByScore(sortType) {
  return {
    type: 'SORT_RECIPES_BY_SCORE',
    payload: sortType,
  };
}

export function filterByDiets(payload) {
  return {
    type: 'FILTER_BY_DIETS',
    payload,
  };
}

export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_ALL_DIET = 'GET_ALL_DIET';
export const GET_RECIPES_BY_ID = 'GET_RECIPES_BY_ID';
export const NEW_RECIPE = 'NEW_RECIPE';
export const SORT_RECIPES_BY_NAME = 'SORT_RECIPES_BY_NAME';
export const SORT_RECIPES_BY_SCORE = 'SORT_RECIPES_BY_SCORE';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
