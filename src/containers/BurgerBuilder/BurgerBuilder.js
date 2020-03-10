import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
    }
  }

  // Fetching the ingredients data from the server dynamically;
  componentDidMount () {
    axios.get('https://react-myburger-4c559.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients:response.data});
      })
      .catch(error => {
        this.setState({error:true});
      });

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

  addIngredientHandler = (type) =>{
    const oldCount=this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseable(updatedIngredients);
  }

  removeIngredientHandler = (type) =>{
    if(this.state.ingredients[type]<=0){
      return;
    }
    const oldCount=this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceReduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseable(updatedIngredients);
  }

  purchseHandler = () => {
    this.setState({purchasing:true});
  }

  modifyHandler = () => {
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading:true});
    const order ={
      ingredients:this.state.ingredients,
      price:this.state.totalPrice,
      customer:{
        name: "Weiwei",
        address:{
          street:'1121 Zimmerman Crescent',
          zipCode: 'L9T5T2',
          country:'Canada'
        },
        email:'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json',order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading:false, purchasing: false});
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // tranform the ingredients info into T or F information
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = null;
    // check whether the ingredients is null, if it is load from the backend
    // assign the burger control and components to a changeable variable for
    // dynamically control
    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            purchaseable={this.state.purchaseable}
            price = {this.state.totalPrice}
            disabled = {disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordering ={this.purchseHandler}/>
        </Aux>);
        orderSummary = <OrderSummary
          ingredients={this.state.ingredients}
          price = {this.state.totalPrice}
          pay = {this.purchaseContinueHandler}
          modify = {this.modifyHandler}/>
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder,axios);
