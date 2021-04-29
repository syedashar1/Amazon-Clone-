import React, { Component } from 'react'
import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from '../actions/userActions'
import SearchBox from './searchBox';


class Navbar extends Component {
        render() {

          const {cartItems , userInfo , signout } = this.props

                return (
                        <div>


                        <header className="row">
                                <div>
                                <Link  className="brand"  to="/">Amazona</Link>
                                
                                </div>
                                <div>
                                <Route render={({ history }) => ( <SearchBox history={history}></SearchBox>)}></Route> 
                                {/* <SearchBox></SearchBox>  */}
                                </div>
                                <div>
                                <Link to="/cart"  > 
                                Cart {cartItems > 0 && ( <span className="badge">{cartItems }</span> )}
                                </Link>

                                { this.props.userInfo? 
                                (
                                        <div className="dropdown">
                                        <Link to="#">
                                          {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                        </Link>
                                        <ul className="dropdown-content">
                                          <li> <Link to="/profile"> Edit Profile </Link> </li>
                                          <li> <Link to="/orderhistory"> Order History </Link> </li>
                                          <li> <Link to="/" onClick={signout} > Sign Out </Link> </li>
                                        </ul>
                                      </div>
                                        
                                ) :
                                  (<Link  className="brand"  to="/signin">Sign In</Link>)
                                 
                                 }
                                 {userInfo && userInfo.isAdmin && ( <div className="dropdown">
                                        <Link to="#">
                                          Admin <i className="fa fa-caret-down"></i>{' '}
                                        </Link>
                                        <ul className="dropdown-content">
                                          <li> <Link to="/dashboard"> Dashboard </Link> </li>
                                          <li> <Link to="/productlist"> Product List </Link> </li>
                                          <li> <Link to="/orderlist"  > Order List </Link> </li>
                                          <li> <Link to="/userlist" > User List </Link> </li>
                                          <li> <Link to="/coupon" > Coupons </Link> </li>
                                        </ul>
                                      </div>)}

                                      {userInfo && userInfo.isSeller && (
                                                <div className="dropdown">
                                                <Link to="#admin">
                                                        Seller <i className="fa fa-caret-down"></i>
                                                </Link>
                                                <ul className="dropdown-content">
                                                        <li>
                                                        <Link to={`/seller/${userInfo._id}`}>
                                                                {/* {userInfo.seller.name} */}
                                                        Display Page
                                                        </Link>
                                                        </li>
                                                        <li> <Link to="/productlist/seller">Products</Link> </li>
                                                        <li> <Link to="/orderlist/seller">Orders</Link> </li>
                                                 </ul>
                                                </div>
                                                )}
                                 

                                
                                </div>
                        </header>

                                
                        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
      
                cartItems : state.cart.cartItems.length ,
                userInfo : state.userSignin.userInfo 
        
        
        }),
        {
                signout
        }
      
)(Navbar);

