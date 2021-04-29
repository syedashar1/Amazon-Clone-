import React, { Component } from 'react'
import { listProducts , detailsProduct , updateProduct , updateProductRESET } from '../actions/productsAction';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Axios from 'axios';



class EditProduct extends Component {


        constructor(){
                super()
                this.state ={
                        image: "purenullxxx",
                        title: "purenullxxx",
                        description: "purenullxxx",
                        price: "purenullxxx",
                        brand: "purenullxxx",
                        category: "purenullxxx",
                        countInStock : "purenullxxx",

                        updateAvaliableSizes : false ,
                        S : false , 
                        M : false , 
                        L : false , 
                        XL : false , 
                        XS : false , 
                      
                }
        }





        componentDidMount(){
                this.props.detailsProduct(this.props.match.params.id)
                this.props.updateProductRESET()
                
        }
        


        handleInput = (e) =>{
  
                this.setState({[e.target.id] : e.target.value })
                
        }

        handleCheck = (e) =>{
  
          this.setState({[e.target.id] : e.target.checked })
          
  }


  uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.props.userInfo.token}`,
        },
      });
      console.log(data);
      this.setState({image:data})
      
    } catch (error) {
      console.log(error);
    }
  };




        submitHandler = (e) => {
          e.preventDefault()
          const {product , updateSuccess , updateLoading } = this.props
          const {image , title , description , price , brand , countInStock , category } = this.state 
          const {updateAvaliableSizes , S , XL ,XS ,M ,L } = this.state 
          
          if(updateAvaliableSizes){
            var availableSizes = [];
            if(XS) availableSizes.push('XS')
            if(S) availableSizes.push('S')
            if(M) availableSizes.push('M')
            if(L) availableSizes.push('L')
            if(XL) availableSizes.push('XL')
          }

          const updatedProduct = {

            _id : product._id ,
            image: image === "purenullxxx" ? product.image : image ,
            title: title === "purenullxxx" ? product.title : title ,
            category: category === "purenullxxx" ? product.category : category ,
            description: description === "purenullxxx" ? product.description : description ,
            price: Number(price === "purenullxxx" ? product.price : price) ,
            brand: brand === "purenullxxx" ? product.brand : brand ,
            countInStock : Number(countInStock === "purenullxxx" ? product.countInStock : countInStock) ,
            availableSizes : updateAvaliableSizes ? availableSizes : product.availableSizes

            }
          console.log(updatedProduct);
          this.props.updateProduct(updatedProduct)
          
        }



        render() {

        const {product , updateLoading , updateSuccess , loading} = this.props
        const {image , title , description , price , brand , countInStock , 
              updateAvaliableSizes , S , XL ,XS ,M ,L , category } = this.state  

        const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
                if (!this.props.userInfo && !this.props.userInfo.isAdmin) {
                        
                        this.props.history.push(redirect);
                }

        return (
                <div><div>

      <form className="form" onSubmit={this.submitHandler}>
        
        {loading ? (
          <div>loading...</div>
        )  : (
          <>
          <div>

          

          <h1>Edit Product {product._id}</h1>
          </div>

            <div>
              <label htmlFor="name">Name</label>
              <input id="title" type="text" placeholder="Enter name"onChange={this.handleInput}
              value={title === "purenullxxx" ? product.title : title } ></input>
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input id="price" type="number" placeholder="Enter price"onChange={this.handleInput}
              value={price === "purenullxxx" ? product.price : price } ></input>
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input id="image" type="text" placeholder="Enter price"onChange={this.handleInput}
              value={image === "purenullxxx" ? product.image : image } ></input>
            </div>

            <div>
              <label htmlFor="price">Category</label>
              <input id="category" type="text" placeholder="Enter category"onChange={this.handleInput}
              value={category === "purenullxxx" ? product.category : category } ></input>
            </div>

            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={this.uploadFileHandler}
              ></input>
              
            </div>
            

            <div>
              <label htmlFor="brand">Brand Name </label>
              <input id="brand" type="text" placeholder="Enter category"onChange={this.handleInput}
              value={brand === "purenullxxx" ? product.brand : brand } ></input>
            </div>

            <div>
              <label htmlFor="countInStock">Count in Stock</label>
              <input id="countInStock" type="number" placeholder="Enter category" onChange={this.handleInput}
              value={countInStock === "purenullxxx" ? product.countInStock : countInStock } ></input>
            </div>

            <div>
              
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="5" type="text"
                placeholder="Enter description" onChange={this.handleInput}
                value={description === "purenullxxx" ? product.description : description }
              ></textarea>
            </div>

            <div>
              <Link to="#" onClick={()=> this.setState({updateAvaliableSizes:true})} > 
              <h1>Update Avaliable Sizes</h1> 
              </Link>
              {updateAvaliableSizes && (<div>
                <h5>Avaliable Sizes : {product.availableSizes.map((a) => <span key={a} >{a } {", "} </span>  )} </h5>
                <div>Set New Avaliable Sizes : </div>
                <div>
                  <br/>
                <label className="forcheckboxcontainer">ExtraSmall
                <input id="XS" value={XS} onChange={this.handleCheck} type="checkbox"
                ></input>
                <span className="checkmark"></span></label>

                <label className="forcheckboxcontainer">Small
                <input id="S" value={S} onChange={this.handleCheck} type="checkbox"
                ></input>
                <span className="checkmark"></span></label>

                <label className="forcheckboxcontainer">Medium
                <input id="M" value={M} onChange={this.handleCheck} type="checkbox"
                ></input>
                <span className="checkmark"></span></label>

                <label className="forcheckboxcontainer">Large
                <input id="L" value={L} onChange={this.handleCheck} type="checkbox"
                ></input>
                <span className="checkmark"></span></label>

                <label className="forcheckboxcontainer">ExtraLarge
                <input id="XL" value={XL} onChange={this.handleCheck} type="checkbox"
                ></input>
                <span className="checkmark"></span></label>
                </div>
                <br/>
              </div>)}
            </div>

            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
              {updateLoading && (<div>Wait a while...</div>)}
              {updateSuccess && (<div><p>Product Updated!</p>
              <p>Go to product? <Link to={`/product/${product._id}`}>Yes</Link> </p>


              </div>
              
              )}
            </div>

          </>
        )}
      </form>
    </div>
        
                </div>
                )
        }
}




export default connect(
        
        (state) => ({ 
      
                product : state.productDetails.product ,
                loading : state.productDetails.loading ,

                updateSuccess : state.productUpdate.success , 
                updateLoading : state.productUpdate.loading ,

                userInfo : state.userSignin.userInfo 

        
        
        }),
        {
          detailsProduct , updateProduct , updateProductRESET
        }
      
)(EditProduct);