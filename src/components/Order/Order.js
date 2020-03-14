import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  const ingredient = [];
  for (let ingreName in props.ingredients) {
    ingredient.push(
      {name:ingreName,
      amount: props.ingredients[ingreName]});
  }

  const ingreOutput = ingredient.map(ig =>{
    return(
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display:'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        >
          {ig.name} ({ig.amount})
      </span>
    );
  });

  return(
    <div className={classes.Order}>

      <p>Ingredients: {ingreOutput}</p>
      <p>Price: <strong>CAD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
