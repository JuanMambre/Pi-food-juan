import {
  GET_RECIPES_BY_NAME,
  GET_ALL_RECIPES,
  GET_ALL_DIET,
  GET_RECIPES_BY_ID,
  NEW_RECIPE,
  SORT_RECIPES_BY_NAME,
  SORT_RECIPES_BY_SCORE,
  FILTER_BY_DIETS,
} from '../Actions';
const initialState = {
  recipes: [],
  allRecipes: [],
  dietTypes: [],
  recipeDetails: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };

    case GET_ALL_DIET:
      return {
        ...state,
        dietTypes: action.payload,
      };

    case GET_RECIPES_BY_ID:
      return {
        ...state,
        recipeDetails: action.payload,
      };
    case NEW_RECIPE:
      return {
        ...state,
      };

    case SORT_RECIPES_BY_NAME:
      let sortedRecipes =
        action.payload === 'asc'
          ? state.recipes.slice().sort((a, b) => {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              return 0;
            })
          : state.recipes.slice().sort((a, b) => {
              if (a.title > b.title) return -1;
              if (a.title < b.title) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipes,
      };

    case SORT_RECIPES_BY_SCORE:
      let sortedRecipesScore =
        action.payload === 'asc'
          ? state.recipes.slice().sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          : state.recipes.slice().sort((a, b) => {
              if (a.healthScore > b.healthScore) return -1;
              if (a.healthScore < b.healthScore) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipesScore,
      };

    case FILTER_BY_DIETS:
      let recipes = state.allRecipes;
      const recipesFilter = recipes.filter(
        (r) => r.diets && r.diets.some((re) => re === action.payload)
      );
      return {
        ...state,
        recipes: recipesFilter,
      };

    default:
      return { ...state };
  }
}
