import * as actionType from '../actions/actionType';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  purchaseable: false,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.8
}

const updatePurchaseable = (ingredients) => {
  const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey]
    }).reduce((sum,el) =>{
      return sum + el;
    }, 0);
    return ( sum>0 );
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      const newIngredsAdd = {
        ...state.ingredients,
        [action.ingredientName] : state.ingredients[action.ingredientName] + 1
      };
      return{
        ...state,
        ingredients: newIngredsAdd,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purchaseable: updatePurchaseable(newIngredsAdd)
      };
    case actionType.REMOVE_INGREDIENT:
      const newIngredsRemove = {
        ...state.ingredients,
        [action.ingredientName] : state.ingredients[action.ingredientName] - 1
      };
      return {
        ...state,
        ingredients: newIngredsRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        purchaseable: updatePurchaseable(newIngredsRemove)
      };
    case actionType.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice:4,
        error: false
      };
    case actionType.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }

    default:
      return state;
  }
};

export default reducer;
