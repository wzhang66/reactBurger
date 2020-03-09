import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform:'capitalize'}}>
            {igKey}
          </span>: {props.ingredients[igKey]}
        </li>);
    });
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button clicked = {props.pay} btnType="Success">Pay now!</Button>
      <Button clicked = {props.modify} btnType="Modify">Modify my order</Button>
      <Button clicked = {props.reset} btnType="Danger">Cancel my order</Button>
    </Aux>
  )
};

export default orderSummary;
