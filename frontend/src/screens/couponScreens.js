import React, { Component } from 'react'
import { connect } from 'react-redux';
import {createCoupon , listCoupons , deleteCoupon } from '../actions/orderActions'




class couponScreens extends Component {


        constructor(){
                super();
                this.state={
                        name : '',
                        type : '' , 
                        discount : 0 ,
                        details : '' ,
                }
        }

        componentDidMount(){
                this.props.listCoupons()
        }


        submitHandler = (e) => {
                e.preventDefault()
                console.log(this.state);
                this.props.createCoupon(this.state)
        }

        handleDelete = (x) =>{
                console.log('deleting coupon');

                this.props.deleteCoupon(x)
        }



        render() {

                const {name , type , discount , details} = this.state

                const { createLoading , createSuccess , createError , coupons , couponsError , couponsLoading } = this.props

                const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
                if (!this.props.userInfo || !this.props.userInfo.isAdmin) {this.props.history.push(redirect)}


                return (
                        <div>




                        <br/><br/><br/>

                        <div>
                        {  !coupons ? (<div>Loading...</div>) : (<div>

                                <table className="table" >
                                <thead>
                                <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Discount</th>
                                        <th>Details</th>
                                        <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.coupons.map((coupon)=>(
                                <tr key={coupon._id} >
                                        <td> {coupon.name} </td>
                                        <td> {coupon.type} </td>
                                        <td> {coupon.discount}  </td>
                                        <td> {coupon.details} </td>
                                        <td>
                                        <button onClick={()=>this.handleDelete(coupon._id)} >Delete</button>
                                        </td>
                                        
                                </tr>
                                ))}
                                </tbody>
                                </table>


                        </div>) }  
                        </div>





                                <br/><br/><br/>
                                <form className="form" onSubmit={this.submitHandler} autoComplete="off">
                
                <div><h1>Create a CoupOn</h1></div>
        
          <>


            <div>
              <label htmlFor="name">CoupOn </label>
              <input
                id="name"
                name="name"
                type="text"
                value = {name}
                onChange={(e) => this.setState({name : e.target.value}) }

              ></input>
                <label htmlFor="type" >CoupOn Type</label>
                      <select id="type" value={type} onChange={(e) => this.setState({type : e.target.value}) } >
                        <option value="">Select...</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Products">Products</option>
                      </select>
                <label htmlFor="name">CoupOn Discount</label>
              <input
                id="details"
                name="name"
                type="number"  min="0" max="100"
                value = {discount}
                onChange={(e) => this.setState({discount : e.target.value}) }

              ></input>
                <label htmlFor="name">CoupOn Details</label>
              <input
                id="name"
                name="name"
                value = {details}
                type="text"
                onChange={(e) => this.setState({details : e.target.value}) }
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Create CoupOn
              </button>
              {createLoading && <div> Loading... </div> }
              {createSuccess && <div> A new coupon created ! </div> }
              {createError && <div> {createError}</div> }
            </div>





          </>
          
      </form>

                                
                        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
        
        coupons : state.couponList.coupons ,
        couponsLoading : state.couponList.loading ,
        couponsError : state.couponList.error ,


        userInfo : state.userSignin.userInfo , 

        createLoading : state.couponCreate.loading , 
        createSuccess : state.couponCreate.success , 
        createError : state.couponCreate.error , 




        }),
        {
                createCoupon , listCoupons , deleteCoupon
   
          
        } 
      
)(couponScreens);