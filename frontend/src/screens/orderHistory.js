import React, { Component } from 'react'
import {listOrderMine} from '../actions/orderActions'
import { connect } from "react-redux";
import Fade from "react-reveal/Fade"

class orderHistory extends Component {



        componentDidMount(){
                this.props.listOrderMine()
        }




        render() {

                const {loading , orders , userInfo} = this.props

                const redirect = this.props.location.search
                ? this.props.location.search.split('=')[1]
                : '/';
                if (!this.props.userInfo) {
                        
                        this.props.history.push(redirect);
                }

return (
                <div>
                <div>



                        <h1>Order History</h1>
                        <button onClick={()=>{console.log(orders)}} ></button>
                        {loading ? ( <div>Loading...</div>  )  : (
                        <table className="table">
                        <thead>
                         <tr>
                                <th>ID</th>
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
                loading : state.orderMineList.loading,
                orders : state.orderMineList.orders,
                error : state.orderMineList.error , 
                userInfo : state.userSignin.userInfo
        
        }),
        {
          listOrderMine
        } 
      
)(orderHistory);
