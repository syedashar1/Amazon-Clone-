import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {userDetails , updateUser} from '../actions/userActions'



class editUserByAdmin extends Component {


        constructor(){
                super()
                this.state ={
                        name : "purenullxxx",
                        email : "purenullxxx",
                        
                        seller : false , 
                        admin : false , 
                      
                }
        }





        componentDidMount(){
                this.props.userDetails(this.props.match.params.id)
                
        }
        


        handleInput = (e) =>{
  
                this.setState({[e.target.id] : e.target.value })
                
        }

        handleCheck = (e) =>{
  
          this.setState({[e.target.id] : e.target.checked })
          
  }




        submitHandler = (e) => {
          e.preventDefault()
          const {user} = this.props
          const {name , email , admin , seller} = this.state 
          

          const updatedUser = {

            _id : user._id ,
            name: name === "purenullxxx" ? user.name : name ,
            email: email === "purenullxxx" ? user.email : email ,
            isAdmin : admin , 
            isSeller : seller ,

            }
          console.log(updatedUser);
          this.props.updateUser(updatedUser)
          
        }



        render() {

        const {user , updateLoading , updateSuccess , loading} = this.props
        const {name , email , admin , seller} = this.state 

        const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
                if (!this.props.userInfo && !this.props.userInfo.isAdmin) {
                        
                        this.props.history.push(redirect);
                }

        return (
                <div><div>
      <button onClick={()=>{console.log(this.props);}} >brr</button>
        
      <form className="form" onSubmit={this.submitHandler}>
        
        {!user ? (
          <div>loading...</div>
        )  : (
          <>
          <div>

          
          <h1>Edit User {user._id}</h1>
          </div>

            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter name"onChange={this.handleInput}
              value={name === "purenullxxx" ? user.name : name } ></input>
            </div>

            <div>
              <label htmlFor="price">Email</label>
              <input id="email" type="email" placeholder="Enter email"onChange={this.handleInput}
              value={email === "purenullxxx" ? user.email : email } ></input>
            </div>


                <div style={{alignItems :'center'}} >
                <label className="forcheckboxcontainer">Admin
                <input id="admin" value={admin} onChange={this.handleCheck} type="checkbox"
                ></input>
                <span className="checkmark"></span>
                </label>

                <label className="forcheckboxcontainer">Seller
                <input id="seller" value={seller} onChange={this.handleCheck} type="checkbox"
                ></input>
                <span className="checkmark"></span>
                 </label>
                </div>


            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
              {updateLoading && (<div>Wait a while...</div>)}
              {updateSuccess && (<div><p>User Updated!</p>


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
      

                user : state.getDetails.user , 
                loading : state.getDetails.loading , 
                error : state.getDetails.error ,

                userInfo : state.userSignin.userInfo , 

                updateLoading : state.userUpdate.loading ,
                updateSuccess : state.userUpdate.success ,
                updateError : state.userUpdate.error ,

        
        
        }),
        {
                userDetails , updateUser
        }
      
)(editUserByAdmin);