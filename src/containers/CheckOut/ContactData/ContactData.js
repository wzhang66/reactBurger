import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state ={
    orderForm:{
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value:'',
        validation:{
          required: true
        },
        valid: false,
        shouldCheck: true,
        touch: false
      },
      street:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value:'',
        validation:{
          required: true
        },
        valid: false,
        shouldCheck: true,
        touch: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postcode'
        },
        value:'',
        validation:{
          required: true
        },
        valid: false,
        shouldCheck: true,
        touch: false
      },
      country:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value:'',
        validation:{
          required: true
        },
        valid: false,
        shouldCheck: true,
        touch: false
      },
      email:{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value:'',
        validation:{
          required: true
        },
        valid: false,
        shouldCheck: true,
        touch: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value:'fastest',displayValue:"Fastest"},
            {value:'cheapest',displayValue:"Cheapest"}
          ]
        },
        value:'fastest',
        shouldCheck: false,
        valid: true
      },
    },
    formValid : false,
    loading:false
  }

  // function for checking the validation properties
  checkValidity (value, rules) {
    let isValid = false;

    if(rules.required){
      isValid = value.trim() !== '';
    }

    return isValid;
  }

  // function for sending the order to the backend database
  orderHandler = (event) =>{
    event.preventDefault();
    // A const to handle the data for submiting
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    this.setState({loading:true});
    const order ={
      ingredients:this.props.ingreds,
      price:this.props.price,
      orderData: formData
    }
    axios.post('/orders.json',order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading:false});
      });
  }

  // Handling the user input data
  inputChangeHandler = (event, inputId) => {
    const updateOrderForm = {
      ...this.state.orderForm
    };
    const updateFormElement = {...updateOrderForm[inputId]};
    updateFormElement.value = event.target.value;
    if (updateFormElement.shouldCheck) {updateFormElement.valid =
    this.checkValidity(updateFormElement.value,updateFormElement.validation)}
    updateFormElement.touch = true;
    updateOrderForm[inputId] = updateFormElement;
    let checkFormValid = true;
    for (let inputId in updateOrderForm) {
      checkFormValid = updateOrderForm[inputId].valid && checkFormValid;
    }
    this.setState({orderForm: updateOrderForm,formValid:checkFormValid});
  }

  render(){
    const formElementsArray = [];
    // loop through the orderForm
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id:key,
        config:this.state.orderForm[key]
      });
    }

    //creating the form for looping through the input data
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement=>(
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={formElement.config.touch ? !formElement.config.valid : false}
            touch = {formElement.config.touch}
            changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
        ))}
        <Button  btnType="Success" disabled={!this.state.formValid} >ORDER NOW</Button>
      </form>);
    if(this.state.loading) {
      form = <Spinner />;
    }

    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    ingreds: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(withRouter(ContactData));
