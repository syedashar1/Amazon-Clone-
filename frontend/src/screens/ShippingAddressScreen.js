import React, { Component } from 'react'
import CheckoutSteps from '../components/checkoutSteps'
import { connect } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions"

class ShippingAddressScreen extends Component {



        constructor(){
                super()
                this.state = {

                        fullName : "" ,
                        address : "" ,
                        city : "" , 
                        postalCode : "" ,
                        country : "" ,
                }
        }


        submitHandler = (e) => {
                e.preventDefault()
                console.log(this.state);
                this.props.history.push('/payment');
                this.props.saveShippingAddress(this.state)

        }


        handleInput = (e) =>{ this.setState({[e.target.id] : e.target.value }) }


        render() {


                if(this.props.cartItems.length === 0){ this.props.history.push('/cart'); }
                else if(!this.props.userInfo){ this.props.history.push('/signin');  }

                const {fullName , address , city , postalCode , country } = this.state




        return (
                        <div>
                                <CheckoutSteps step1 step2></CheckoutSteps>



        <form className="form" onSubmit={this.submitHandler}>
                <div>
                        <h1>Shipping Address</h1>
                </div>
        <div>

          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" placeholder="Enter full name" value={fullName} 
          onChange={this.handleInput} required ></input>

        </div>
        <div>
                
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="Enter address" value={address}
          onChange={this.handleInput}required ></input>

        </div>
        <div>
                
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="Enter city" value={city}
          onChange={this.handleInput} required ></input>

        </div>
        <div>

          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" placeholder="Enter postal code" value={postalCode}
           onChange={this.handleInput} required ></input>

        </div>
        <div>

          <label htmlFor="country">Country</label>
          <input type="text" id="country" placeholder="Enter country" value={country}
          onChange={this.handleInput} required ></input>

        </div>
        <div>


          <label />
          <button className="primary" type="submit">
            Continue
          </button>

        </div>
      </form>







                        </div>
                )
        }
}




export default connect(
        
        (state) => ({ 
      
                cartItems : state.cart.cartItems ,
                userInfo : state.userSignin.userInfo 
        
        
        }),
        {
                saveShippingAddress
        }
      
)(ShippingAddressScreen);
