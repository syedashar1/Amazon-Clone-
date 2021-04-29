import React, { Component } from 'react'
import {listOrders , deleteOrder , deleteREST } from '../actions/orderActions'
import { connect } from "react-redux";
import Fade from "react-reveal/Fade"


class orderListScreen extends Component {



        componentDidMount(){
                const sellerMode = this.props.match.path.indexOf('/seller') >= 0;
                console.log(sellerMode);
                this.props.listOrders({ seller: sellerMode ? this.props.userInfo._id : '' })
        }


        deleteHandler = (x)=> {

                if (window.confirm('Are you sure to delete?')) {
                this.props.deleteOrder(x)

                }


        }




        render() {

                const {loading , orders , userInfo , loadingDelete , successDelete , deleteID} = this.props

                const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
                if (!this.props.userInfo && (!this.props.userInfo.isAdmin || !this.props.userInfo.isSeller) ) {
                        
                        this.props.history.push(redirect);
                }

                if(successDelete){
                        this.props.deleteREST()
                        this.props.listOrders()
                        
                }


return (
                <div>
                <div>



                        <h1>Orders</h1>
                        <button onClick={()=>{console.log(this.props)}} ></button>
                        {loading ? ( <div>Loading...</div>  )  : (
                        <table className="table">
                        <thead>
                         <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                        </tr>
                        </thead>


                        <tbody>
                        {orders.map((order) => (
                        <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.shippingAddress.fullName}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      this.props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => this.deleteHandler(order._id)}
                  >
                    Delete
                  </button>
                  {(order._id === deleteID && loadingDelete ) &&  <div>Loading...</div>}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
                        </div>
                )
        }
}



export default connect(
        
        (state) => ({ 
                orders : state.orderList.orders,
                loading : state.orderList.loading,
                error : state.orderList.error,

                loadingDelete : state.orderDelete.loading ,
                successDelete : state.orderDelete.success ,
                deleteID : state.orderDelete.id ,

                userInfo : state.userSignin.userInfo


        
        }),
        {
                listOrders , deleteOrder , deleteREST
        } 
      
)(orderListScreen);
