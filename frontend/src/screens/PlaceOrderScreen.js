import React, { Component } from 'react'
import CheckoutSteps from '../components/checkoutSteps'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {createOrder , searchCoupon } from '../actions/orderActions'

class PlaceOrderScreen extends Component {

        constructor(){
          super();
          this.state={
            x : '',
            couponPresent : '' ,
            shippingPrice : 10
          }
        }


        couponFinder = (e) => {
          e.preventDefault()
          this.props.searchCoupon(this.state.x);
        }




        placeOrderHandler = ()=> {


          const {shippingAddress , paymentMethod , cartItems , userInfo  } = this.props
          const itemsPrice = Number(cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2))
          const taxedPrice = Number((0.15 * itemsPrice).toFixed(2))
          const shippingPrice = this.state.shippingPrice ;
          const orderTotal = Number(( itemsPrice + taxedPrice + shippingPrice).toFixed(2))



          
          this.props.createOrder({ 

                      orderItems : cartItems ,            
                      itemsPrice , 
                      taxedPrice , 
                      shippingPrice , 
                      orderTotal , 
                      paymentMethod  , 
                      shippingAddress , 
                      userInfo 

                    })


        }




        render() {


                const {shippingAddress , paymentMethod , cartItems , success , order , coupon , couponLoading ,couponFind , couponError } = this.props
                const itemsPrice = Number(cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2))
                const taxedPrice = Number((0.15 * itemsPrice).toFixed(2))
                const shippingPrice = this.state.shippingPrice ;
                const orderTotal = Number(( itemsPrice + taxedPrice + shippingPrice).toFixed(2))


                if(coupon && this.state.couponPresent !== coupon.name){
                  console.log(coupon);
                  if(coupon.type == "Delivery"){
                    const newDelivery = (this.state.shippingPrice) - (this.state.shippingPrice)*(coupon.discount  / 100)
                    this.setState({shippingPrice : newDelivery})
                  }
                  this.setState({couponPresent : coupon.name})
                }




                if(success){
                  this.props.history.push(`/order/${order._id}`);
                }

                return (



                        <div>
                                <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
                                <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {shippingAddress.fullName} <br />
                  <strong>Address: </strong> {shippingAddress.address},
                  {shippingAddress.city}, {shippingAddress.postalCode}
                  ,{shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong><p> {paymentMethod.paymentMethod} </p>
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.title}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Got a Discount Code?</h2>
              </li>
              <li>
                <div className="row">
                  <form onSubmit={this.couponFinder} >
                    <input  value={this.state.x} onChange={(e) => this.setState({x : e.target.value}) }></input>
                    <button className="small" type="submit" >enter</button>
                    { coupon && <div>Coupon Accepted</div> }
                    { couponLoading && <div>Searching for your Coupon</div> }
                    { couponError && <div>NOT FOUND !</div> }
                  </form>
                </div>
              </li>
              
              
            </ul>
          </div>
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>{shippingPrice==0 ? (<h4>Free Delivery</h4>) : (shippingPrice) }</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>{taxedPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                  <strong>{orderTotal}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={this.placeOrderHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
                {(this.props.loading && (<div>loading...</div>) )}
                {(this.props.error && (<div>Error</div>) )}
                {(this.props.success && (<div>Success !</div>) )}
              </li>
            </ul>
          </div>
        </div>
      </div>
                                
                        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
      
                cartItems : state.cart.cartItems ,
                userInfo : state.userSignin.userInfo , 
                shippingAddress : state.cart.shippingAddress , 
                paymentMethod : state.cart.paymentMethod ,


                loading : state.orderCreate.loading , 
                success : state.orderCreate.success ,
                error : state.orderCreate.error ,
                order : state.orderCreate.order , 
                 
                coupon : state.couponFind.coupon ,
                couponLoading : state.couponFind.loading ,
                couponError : state.couponFind.error ,
                

                
        
        
        }),
        {
          createOrder , searchCoupon
        }
      
)(PlaceOrderScreen);