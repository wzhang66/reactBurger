import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value:'',
        validation:{
          required: true,
          isEmail: true
        },
        valid: false,
        shouldCheck: true,
        touch: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value:'',
        validation:{
          required: true,
          minLength: 6
        },
        valid: false,
        shouldCheck: true,
        touch: false
      }
    },
    isSignUp: true

  }

  componentDidMount () {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  checkValidity (value, rules) {
    let isValid = true;

    if(rules.required){

      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if(rules.isEmail) {
      const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  }

  // Handling the user input data
  inputChangeHandler = (event, inputId) => {
    const updateOrderForm = {
      ...this.state.controls
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
    this.setState({controls: updateOrderForm,formValid:checkFormValid});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return{
        isSignUp: !prevState.isSignUp
      };
    })
  }

  render() {
    const formElementsArray = [];
    // loop through the orderForm
    for (let key in this.state.controls) {
      formElementsArray.push({
        id:key,
        config:this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key = {formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={formElement.config.touch ? !formElement.config.valid : false}
        touch = {formElement.config.touch}
        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
      />

    ));

    if(this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return(
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler} >
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button
          clicked = {this.switchAuthModeHandler}
          btnType="Danger">
          SWITCH TO {this.state.isSignUp ? 'SIGNIN': 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email,password, isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
