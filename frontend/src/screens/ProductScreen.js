import React, { Component } from 'react'
import Fade from "react-reveal/Fade"
import Ratings from '../components/Ratings'
import { Link} from 'react-router-dom';
import { createReview , detailsProduct } from '../actions/productsAction';
import { connect } from "react-redux";



class ProductScreenComponent extends Component {

        constructor(){
          super();
          this.state = {
            qty : 1 , 
            rating : 0 , 
            comment : '' 
          }
        }        






  componentDidMount(){
    this.props.detailsProduct(this.props.match.params.id)
}

  addToCartHandler = (x) => {
    this.props.history.push(`/cart/${x}?qty=${ this.state.qty}`);

  }



  submitHandler = (e) => {
    const {rating , comment} = this.state
    e.preventDefault(this.props.match.params.id , { rating, comment, name: this.props.userInfo.name });

    if (this.state.comment && this.state.rating) {
      console.log(this.props.match.params.id , { rating, comment, name: this.props.userInfo.name });  
      this.props.createReview( this.props.match.params.id , { rating, comment, name: this.props.userInfo.name })
    } else {
      alert('Please enter comment and rating');
    }
  };


          render() {

            
              const {qty  ,rating , comment } = this.state
              const {product , userInfo , loadingReviewCreate , errorReviewCreate , successReviewCreate} = this.props
              


                return (
                  <div>

                    <button onClick={()=>{console.log(product)}}>clivk</button>

                    <Link to="/">Back to result</Link>


                    <Fade bottom cascade>
                    { !product ? (<div>Loading...</div>) :
                    (<div>  
                      <div className="row top" style={{marginTop : "50px"}}  >
                        <div className="col-2"  style={{textAlign : "center"}} >
                          <img className="large"src={product.image} style={{maxHeight : "700px"}}  alt={product.name}></img>
                        </div>
                        <div className="col-1">
                        <Fade bottom cascade>
                          <ul>
                            
                            <li>
                              <h1>{product.title}</h1>
                            </li>
                            <li>
                              <Ratings
                                rating={product.rating} numReviews={product.numReviews} ></Ratings>
                            </li>
                            <h1><li>Pirce : ${product.price}</li></h1>
                            <li>
                              Description:
                              <p>{product.description}</p>
                            </li>
                            
                          </ul>
                          </Fade>
                        </div>
                        <div className="col-1">
                          <div className="card card-body">
                            <ul>
                              <li>
                                <div className="row">
                                  <div>Price</div>
                                  <div className="price">${product.price}</div>
                                </div>
                              </li>
                              <li>
                                <div className="row">
                                  <div>Status</div>
                                  <div>
                                    { product.countInStock > 0 ? (
                                      <span className="success">In Stock</span>
                                    ) : (
                                      <span className="error">Unavailable</span>
                                    )}
                                  </div>
                                </div>
                              </li>
                              {product.countInStock > 0 && (
                                  <>
                                    <li>
                                      <div className="row">
                                        <div>Qty</div>
                                        <div>
                                          <select
                                            value={qty}
                                            onChange={(e) => this.setState({ qty : e.target.value})}
                                          >
                                            {[...Array(product.countInStock).keys()].map(
                                              (x) => (
                                                <option key={x + 1} value={x + 1}> {x + 1} </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <button
                                        onClick={ () => this.addToCartHandler(product._id)} className="primary block" >
                                        Add to Cart
                                      </button>
                                    </li>
                                  </>
                  )}
                            </ul>
                          </div>
                        </div>
            
                      </div>
                      
                      <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && ( <div>There is no review</div> )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Ratings rating={review.rating} caption=" "></Ratings>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={this.submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => this.setState({rating : e.target.value}) }
                      >
                        <option value="">Select...</option>
                        <option value="1">Poor</option>
                        <option value="2">Fair</option>
                        <option value="3">Good</option>
                        <option value="4">Very good</option>
                        <option value="5">Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => this.setState({comment : e.target.value}) }
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <div>Loading...</div>}
                      {errorReviewCreate && ( <div>{errorReviewCreate}</div> )}
                      {successReviewCreate && <div>Comment successfully added !</div> }
                    </div>
                  </form>
                ) : (
                  <div style={{backgroundColor : "lightyellow"}} >
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </div>
                )}
              </li>
            </ul>
          </div>
                      
                      </div> )}
                    </Fade>
                  </div>
                )
}
}




export default connect(
        
        (state) => ({ 
      
                product : state.productDetails.product ,
                userInfo : state.userSignin.userInfo ,

                loadingReviewCreate : state.productReviewCreate.loading,
                errorReviewCreate : state.productReviewCreate.error,
                successReviewCreate : state.productReviewCreate.success,
        
        
        }),
        {
          detailsProduct , createReview
        }
      
)(ProductScreenComponent);
