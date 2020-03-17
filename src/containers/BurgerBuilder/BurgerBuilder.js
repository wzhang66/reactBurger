import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


const INGREDIENT_PRICES = {
  salad:0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.8
}

class BurgerBuilder extends Component {
  constructor(props){
    super(props);
    this.state = {
      // the variables which can be managed by redux
      // ingredients: null,
      // totalPrice: 4,
      //purchaseable: false,
      // local state :
      purchasing: false,
    }
  }

  // Fetchin...state,
  componentDidMount () {
    this.props.onInitIngredients();
    // console.log(this.props);
    // axios.get('https://react-myburger-4c559.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients:response.data});
    //   })
    //   .catch(error => {
    //     this.setState({error:true});
    //   });

  }

  updatePurchaseable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum,el) =>{
        return sum + el;
      }, 0);
      this.setState({purchaseable: sum>0});
  }

  // addIngredientHandler = (type) =>{
  //   const oldCount=this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
  //   this.updatePurchaseable(updatedIngredients);
  // }

  // removeIngredientHandler = (type) =>{
  //   if(this.state.ingredients[type]<=0){
  //     return;
  //   }
  //   const oldCount=this.state.ingredients[type];
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceReduction = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceReduction;
  //   this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
  //   this.updatePurchaseable(updatedIngredients);
  // }

  purchseHandler = () => {
    this.setState({purchasing:true});
  }

  modifyHandler = () => {
    this.setState({purchasing:false});
  }

  // transfer this part to redux
  purchaseContinueHandler = () => {
    const queryParams = [];
    // put all the ingredients into a url encoded array
    // for(let i in this.props.ingreds){
    //   queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.props.ingreds[i]));
    // }
    // queryParams.push('price='+this.props.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname:'/checkout',
    //   search:'?' + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push('/checkout');

  }

  render() {
    const disabledInfo = {
      ...this.props.ingreds
    };
    // tranform the ingredients info into T or F information
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = null;
    // check whether the ingredients is null, if it is load from the backend
    // assign the burger control and components to a changeable variable for
    // dynamically control
    let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

    if (this.props.ingreds) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingreds}/>
          <BuildControls
            purchaseable={this.props.purchaseable}
            price = {this.props.totalPrice}
            disabled = {disabledInfo}
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            ordering ={this.purchseHandler}/>
        </Aux>);
        orderSummary = <OrderSummary
          ingredients={this.props.ingreds}
          price = {this.props.totalPrice}
          pay = {this.purchaseContinueHandler}
          modify = {this.modifyHandler}/>
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modify = {this.modifyHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingreds : state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchaseable: state.burgerBuilder.purchaseable,
    error: state.burgerBuilder.error
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    onIngredientAdd : (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove : (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())

  };
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
