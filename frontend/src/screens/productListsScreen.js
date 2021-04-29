import React, { Component } from 'react'
import { Link} from 'react-router-dom';
import { connect } from "react-redux";
import { listProducts , createProduct ,deleteProduct , deleteREST } from '../actions/productsAction';

class productListsScreen extends Component {

        constructor(){
                super();
                this.state={
                        currentUrl : '' ,
                }
        }

        componentDidMount(){
                this.setState({currentUrl : this.props.match.params})

                const sellerMode = this.props.match.path.indexOf('/seller') >= 0;
                console.log(sellerMode);
                const { pageNumber = 1 } = this.props.match.params;
                this.props.listProducts({ seller: sellerMode ? this.props.userInfo._id : '' , pageNumber })

                
              }

        createHandler = async () => {
                this.props.createProduct()
        };

        // deleteHandler = (x)=> {

        //         if (window.confirm('Are you sure to delete?')) {
        //         this.props.deleteProduct(x._id)

        //         }


        // }

        deleteHandler = (x)=> {
                this.props.deleteProduct(x._id)
        }




        render() {
                if(this.props.match.params !== this.state.currentUrl ){
                        this.componentDidMount()
                }

                if(this.props.successCreate){
                        this.props.history.push(`/product/${this.props.createdProduct._id}/edit`)
                }

                const {products , loading , createProduct , successDelete , loadingCreate , deleteID , successCreate , loadingDelete , page , pages } = this.props
                const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
                if (!this.props.userInfo && (!this.props.userInfo.isAdmin || !this.props.userInfo.isSeller) ) {
                        
                        this.props.history.push(redirect);
                }

                if(successDelete){
                        // this.props.listProducts({})
                        
                }

                return (
                        <div>
                                <button onClick={()=>{console.log(pages);}} ></button>
                                <div className="row">
                                        <h1>Products</h1>
                                        <button type="button" className="primary" onClick={this.createHandler}>
                                        Create Product </button>
                                </div>
                                {loadingCreate && <div>Loading...</div>}
                                {successCreate && <div>new sample product created!</div>}


                                {loading && !products ? ( <div>Loading...</div> )  : (
                                <div>
                                <table className="table">
                                <thead>
                                <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th>ACTIONS</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {products.map((product) => (
                                        <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                        <button
                                        type="button" className="small"
                                        onClick={() => this.props.history.push(`/product/${product._id}/edit`)
                                        }
                                        > Edit
                                        </button>

                                        <button
                                        type="button" className="small"
                                        onClick={() => this.deleteHandler(product)}
                                        >  Delete
                                        </button>
                                        {(product._id === deleteID && loadingDelete ) &&  <div>Loading...</div>}
                                        {(product._id === deleteID && successDelete ) &&  <div>Deleted !</div>}


                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>                                        
        <br></br>                                        
        <br></br>                                        
        <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link className={x + 1 === page ? 'active' : ''}  
              key={x + 1} to={`/productlist/pageNumber/${x + 1}`}
              > {x + 1} </Link>
            ))}
          </div>
    </div>
        
        
      )}
    </div>
                )
        }
}



export default connect(
        
        (state) => ({ 

                products: state.productList.products ,
                loading: state.productList.loading ,
                page: state.productList.page ,
                pages: state.productList.pages ,


                loadingCreate: state.productCreate.loading ,
                successCreate: state.productCreate.success ,
                createdProduct: state.productCreate.product ,


                userInfo : state.userSignin.userInfo , 

                loadingDelete : state.productDelete.loading ,
                successDelete : state.productDelete.success ,
                deleteID : state.productDelete.id ,
        
        }),
        {
                listProducts , createProduct , deleteProduct , deleteREST
        }

)(productListsScreen);