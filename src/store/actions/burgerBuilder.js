import * as actionType from './actionType';
import axios from '../../axios-orders';

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
  return dispatch => {
    axios.get('https://react-myburger-4c559.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed);
      });
  };
}
