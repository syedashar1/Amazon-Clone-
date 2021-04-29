import React, { Component } from 'react'
import { connect } from "react-redux";
import {userDetails , updateUserProfile , updateUserProfileReset } from "../actions/userActions"
import { listProducts  } from '../actions/productsAction';
import Ratings from '../components/Ratings';
import { Link } from 'react-router-dom';

class sellerScreens extends Component {


        componentDidMount(){
                this.props.userDetails(this.props.match.params.id)
                this.props.listProducts({ seller : this.props.match.params.id} )

        }




        render() {

                const {user , products , loading , error , userInfo , loadingProducts , errorProducts} = this.props

                if(!userInfo){
                    this.props.history.push(`/signin`);
                  
                }

                return (
                        <div className="row top">
      <div className="col-1">
        {loading ? (
          <div>Loading ...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img className="medium" src={user.seller.logo} alt={user.seller.name} ></img>
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Ratings
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Ratings>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <div>Loading ...</div>
        ) : errorProducts ? (
                <div>{errorProducts}</div>
        ) : (
          <>
            {products.length === 0 && <div>No Product Found</div>}


                <div className="row center">
                        {products.map((product) => (
                        <div key={product._id} className="card">
                                <div className="card-img" >
                                <Link to={`/product/${product._id}`}>
                                <div className="card-img" >
                                <img
                                className="medium"
                                src={product.image}
                                alt={product.title}
                                />
                                </div>
                                </Link>
                                </div>
                                <div className="card-body">
                                <a href={`/product/${product._id}`}>
                                <h2>{product.title}</h2>
                                </a>

                                <Ratings rating={product.rating} numReviews={product.numReviews} ></Ratings>
                                
                                <div className="price">${product.price}</div>
                                </div>
                        </div>
                        
                        ))}

                </div> 
          </>
        )}
      </div>
    </div>
                )
        }
}




export default connect(
        
        (state) => ({ 

        user : state.getDetails.user , 
        loading : state.getDetails.loading , 
        error : state.getDetails.error ,

        userInfo : state.userSignin.userInfo , 


        products: state.productList.products ,
        loadingProducts: state.productList.loading ,
        errorProducts: state.productList.error ,


        }),
        {
           
          userDetails , updateUserProfile , updateUserProfileReset , listProducts ,
          
        } 
      
)(sellerScreens);
