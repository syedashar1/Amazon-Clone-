import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link} from 'react-router-dom';
import {detailsOrder , deliverOrder} from '../actions/orderActions'

class OrderScreen extends Component {

        

        componentDidMount = () => {
                this.props.detailsOrder(this.props.match.params.id)
        }





        deliverHandler = (x) => {
          this.props.deliverOrder(x)

          
        }

        render() {


                const {order , loading , success , userInfo} = this.props

                const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
                if (!this.props.userInfo && !this.props.userInfo.isAdmin) {
                        this.props.history.push(redirect);
                }

                if (this.props.deliverSuccess) {
                  this.componentDidMount()
                  }

                return (

                        




                        <div>
                          <button onClick={()=>{console.log(this.props.order);}}></button>

                          { !order ? (<div>Loading...</div>) :(

<div>
<h1>Order {this.props.order._id}</h1>
<div className="row top">
  <div className="col-2">
    <ul>
      <li>
        <div className="card card-body">
          <h2>Shipping</h2>
          <p>
            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
            <strong>Address: </strong> {order.shippingAddress.address},
            {order.shippingAddress.city},{' '}
            {order.shippingAddress.postalCode},
            {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <div variant="success">
              Delivered at {order.deliveredAt}
            </div>
          ) : (
            <div variant="danger">Not Delivered</div>
          )}
        </div>
      </li>
      <li>
        <div className="card card-body">
          <h2>Payment</h2>
          <p>
            <strong>Method:</strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <div variant="success">
              Paid at {order.paidAt}
            </div>
          ) : (
            <div variant="danger">Not Paid</div>
          )}
        </div>
      </li>
      <li>
        <div className="card card-body">
          <h2>Order Items</h2>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>
                      {item.title}
                    </Link>
                  </div>

                  <div>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
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
          <h2>Order Summary</h2>
        </li>
        <li>
          <div className="row">
            <div>Items</div>
            <div>${order.itemsPrice.toFixed(2)}</div>
          </div>
        </li>
        <li>
          <div className="row">
            <div>Shipping</div>
            <div>${order.shippingPrice.toFixed(2)}</div>
          </div>
        </li>
        <li>
          <div className="row">
            <div>Tax</div>
            <div>${order.taxPrice.toFixed(2)}</div>
          </div>
        </li>
        <li>
          <div className="row">
            <div>
              <strong> Order Total</strong>
            </div>
            <div>
              <strong>${order.totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </li>

        {userInfo.isAdmin  && !order.isDelivered && (
                <li>
                  
                  <button
                    type="button"
                    className="primary block"
                    onClick={()=>this.deliverHandler(order._id)}
                  >
                    Deliver Order
                  </button>
                {this.props.deliverLoading && <div>Wait a while</div>}
                {this.props.deliverSuccess && <div>Updated to Delivered !</div>}

                </li>
              )}

      </ul>
    </div>
  </div>
</div>
</div>

                        )}

                          
                        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
       
                error : state.orderDetails.error ,
                order : state.orderDetails.order ,    
                success : state.orderDetails.success ,    
                deliverSuccess : state.orderDeliver.success ,
                deliverLoading : state.orderDeliver.loading ,
                deliverError : state.orderDeliver.error ,
                userInfo : state.userSignin.userInfo

        
        
        }),
        {
                detailsOrder , deliverOrder 
        }
      
)(OrderScreen);