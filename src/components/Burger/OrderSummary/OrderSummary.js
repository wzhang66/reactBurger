import React,{Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>
              {igKey}
            </span>: {this.props.ingredients[igKey]}
          </li>);
      });
    return(
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked = {this.props.pay} btnType="Success">Continue</Button>
        <Button clicked = {this.props.modify} btnType="Modify">Cancel</Button>
      </Aux>
    );
  }
};

export default OrderSummary;
