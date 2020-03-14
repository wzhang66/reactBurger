import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import {withRouter} from 'react-router-dom';

class ContactData extends Component {
  state ={
    name : '',
    email: '',
    address:{
      street:'',
      postcode:''
    },
    loading:false
  }

  orderHandler = (event) =>{
    event.preventDefault();
    this.setState({loading:true});
    const order ={
      ingredients:this.props.ingredients,
      price:this.props.price,
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
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading:false});
      });
  }

  render(){
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postcode" placeholder="Postcode" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER NOW</Button>
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

export default withRouter(ContactData);
