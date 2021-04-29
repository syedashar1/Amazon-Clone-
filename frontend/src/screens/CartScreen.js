import React, { Component } from 'react'
import { addToCart , removeFromCart } from '../actions/cartActions';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Fade from "react-reveal/Fade"

class CartScreen extends Component {



        componentDidMount(){
                if ( this.props.match.params.id) {
                        const qty = this.props.location.search ? Number(this.props.location.search.split('=')[1]) : 1;
                        console.log( this.props.location.search);
                        this.props.addToCart( this.props.match.params.id , qty )
                }
        }

        removeFromCartHandler = (id) => {
                // delete action
        };

        checkoutHandler = () => {
                this.props.history.push('/signin?redirect=shipping');
        };




        render() {


                const productId = this.props.match.params.id;
                

                const {cartItems , error } = this.props

                return (
                
                        <div className="row top">


      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </div>
        ) : (
                <Fade bottom cascade>
          <ul>
            {cartItems.map((item) => (
            
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name}  className="small"></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.title}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty} onChange={(e) => this.props.addToCart(item.product, Number(e.target.value)) } >

                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button type="button" onClick={() => this.props.removeFromCart(item.product)} >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
              
            ))}

            <li>
          { error && <div> <h3>Cant add to Cart.Buy only from <Link to={`/seller/${error}`} > this seller </Link> in this Order</h3> </div> }

            </li>
          </ul>
        
          </Fade>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={this.checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
                      </div>
                )
        }
}

export default connect(
        
        (state) => ({ 
      
                cartItems : state.cart.cartItems ,
                error : state.cart.error , 
        
        
        }),
        {
                addToCart , removeFromCart
        }
      
)(CartScreen);

