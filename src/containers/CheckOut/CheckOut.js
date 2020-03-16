import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class CheckOut extends Component {
  // transfer to redux
  // constructor(props){
  //   super(props);
  //   // Pass the encoded ingredients to the checkout containers
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0
  //   for (let param of query.entries()){
  //     if(param[0] === 'price') {
  //       price = param[1];
  //     } else{
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.state={ingredients: ingredients,price:price};
  // }



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
          ingredients={this.props.ingreds}/>
        <Route
          path={this.props.match.path+'/contact-data'}
          component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    ingreds: state.ingredients
  }
}

export default connect(mapStateToProps)(CheckOut);
