import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class CheckOut extends Component {
  constructor(props){
    super(props);
    // Pass the encoded ingredients to the checkout containers
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0
    for (let param of query.entries()){
      if(param[0] === 'price') {
        price = param[1];
      } else{
        ingredients[param[0]] = +param[1];
      }
    }
    this.state={ingredients: ingredients,price:price};
  }



  checkOutCancelHandler = () =>{
    this.props.history.goBack();
  }

  checkOutContinueHandler = () =>{
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    return(
      <div>
        <CheckoutSummary
          onCheckoutCancel={this.checkOutCancelHandler}
          onCheckoutContinue={this.checkOutContinueHandler}
          ingredients={this.state.ingredients}/>
        <Route
          path={this.props.match.path+'/contact-data'}

          render={()=>(<ContactData ingredients={this.state.ingredients} price={this.state.price}/>)}/>
      </div>
    );
  }
}

export default CheckOut;
