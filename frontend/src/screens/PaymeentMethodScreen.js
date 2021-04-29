import React, { Component } from 'react'
import CheckoutSteps from '../components/checkoutSteps'
import { saveShippingAddress , savePaymentMethod } from "../actions/cartActions"
import { connect } from "react-redux";


class PaymeentMethodScreen extends Component {


        constructor(){
                super()
                this.state = {
                        paymentMethod : ""
                }
        }


        handleInput = (e) =>{ this.setState({ paymentMethod : e.target.value })  }


        submitHandler = (e) => {
                e.preventDefault()
                console.log(this.state);
                this.props.savePaymentMethod(this.state)
                this.props.history.push('/placeorder');


        }


        render() {

                if(!this.props.userInfo){
                        this.props.history.push('/signin');
                }

                else if(!this.props.shippingAddress){
                        this.props.history.push('/shipping');
                }



                return (
                        <div>
                        
                                <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      <form className="form" onSubmit={this.submitHandler}>



        <div> <h1> Payment Method </h1> </div>

        <div>
          <div>
            <input type="radio"  id="paypal" value="PayPal"  name="paymentMethod" required
              onChange={this.handleInput} ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>

        <div>
          <div>
            <input type="radio" id="stripe"  value="Stripe" name="paymentMethod" required
              onChange={this.handleInput} ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>

        <div>
          <div>
            <input type="radio" id="CashOnDelivery"  value="Cash On Delivery" name="paymentMethod" required
              onChange={this.handleInput} ></input>
            <label htmlFor="CashOnDelivery">Cash On Delivery</label>
          </div>
        </div>



        <div>
          <label />
          <button className="primary" type="submit">Continue</button>
        </div>
      </form>
                        </div>
                )
        }
}




export default connect(
        
        (state) => ({ 
      
                cartItems : state.cart.cartItems ,
                userInfo : state.userSignin.userInfo , 
                shippingAddress : state.cart.shippingAddress , 
                paymentMethod : state.cart.paymentMethod

                
        
        
        }),
        {
                saveShippingAddress , savePaymentMethod
        }
      
)(PaymeentMethodScreen);