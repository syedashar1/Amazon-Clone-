import React, { Component , useEffect, useState } from 'react'
import Products from '../components/Products'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";




class HomeScreen extends Component {



        componentDidMount(){
                this.props.listTopSellers()
        }


        
        render() {

                const { loadingSellers , errorSellers , sellers} = this.props

                return (
                        <div>

                        <div>
                        <h2>Top Sellers</h2>
      {loadingSellers ? (
        <div>Loading...</div>
      ) : errorSellers ? (
        <div variant="danger">{errorSellers}</div>
      ) : (
        <>
          {sellers.length === 0 && <div>No Seller Found</div>}
        <div className="carousel-container" >
        <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <div>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
        </>
      )}
      <h2>Featured Products</h2>
                        </div>





                        <Products ></Products>
                                
                        </div>
                )
        }
}



export default connect(
        
        (state) => ({ 
                sellers : state.userTopSeller.users , 
                loadingSellers : state.userTopSeller.loading , 
                selleerrorSellersrs : state.userTopSeller.error , 
        
        }),
        {
          listTopSellers 
        } 
      
)(HomeScreen);




