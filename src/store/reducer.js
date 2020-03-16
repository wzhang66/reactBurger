import * as actionType from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon:0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
  purchaseable: false
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
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purchaseable: updatePurchaseable(newIngredsRemove)
      };

    default:
      return state;
  }
};

export default reducer;
