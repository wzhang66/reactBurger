import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_,i)=>{
        return <BurgerIngredient key={igKey + i} type={igKey}/>;
      });
    }).reduce((arr,el)=>{ //flatten the array to be one dimension
      return arr.concat(el)
    },[]); //Object.keys() returns us an array to use map()
  if(transformedIngredients.length === 0) {
    transformedIngredients =
    <button>Please start adding ingredients</button>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
