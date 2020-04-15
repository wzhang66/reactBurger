import * as actionType from './actionType';


export const addIngredient = (name) =>{
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) =>{
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

//synchronous action creator
export const setIngredients = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return{
    type: actionType.FETCH_INGREDIENTS_FAILED
  }
}

// the asynchronous action which send the database request
export const initIngredients = () =>{
  // the syntax of react thunk to get the dispatch function and return a function
  return {
    type: actionType.INIT_INGREDIENTS
  };
}
