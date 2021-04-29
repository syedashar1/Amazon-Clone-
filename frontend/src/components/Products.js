import React, { Component } from 'react'
import Fade from "react-reveal/Fade"
import Ratings from './Ratings'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { listProducts } from '../actions/productsAction';
import { connect } from "react-redux";


class Products extends Component {


        
        componentDidMount(){

                // this.props.listProducts({ seller: sellerMode ? this.props.userInfo._id : '' })


                this.props.listProducts({})
        }



        render() {



        const {products} = this.props

               
        return (


                
        <div>


                <Fade bottom cascade>
                <button onClick={()=>{console.log(products);}}></button>
                { !products ? (<div>Loading...</div>) :

                                
(

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
                                
                                <div className="row">
                                <div className="price">${product.price}</div>
                                <div>
                                {product.seller && 
                                <Link to={`/seller/${product.seller}`}>
                                {product.sellerName}
                                </Link>}
                                </div>
                                </div>
                                </div>
                        </div>
                        
                        ))}

                </div>

)               }                                                                                                                



                </Fade>
                
        </div>
                )
        }
}




export default connect(
        
        (state) => ({ 

                products: state.productList.products ,

        
        
        }),
        {
                listProducts
        }

)(Products);
