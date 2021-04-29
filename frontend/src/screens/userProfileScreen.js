import React, { Component } from 'react'
import { connect } from "react-redux";
import {userDetails , updateUserProfile , updateUserProfileReset } from "../actions/userActions"
import Fade from 'react-reveal/Fade'
class userProfileScreen extends Component {


          constructor(){
                super();
                this.state = {
                        name : "purenullxxx" , 
                        email  : "purenullxxx" ,
                        sellername : "purenullxxx",
                        sellerlogo : "purenullxxx",
                        sellerdescription : "purenullxxx",


                        password : "" ,
                        confirmPassword : "" ,
                        passwordNotMatched : false, 


                }
        }

        componentDidMount(){
          this.props.userDetails()
          // this.props.updateUserProfileReset()
          
        }

    



        handleInput = (e) =>{
  
                this.setState({[e.target.name] : e.target.value })

        }



        submitHandler  = async (e)  => {
          e.preventDefault()






          if( this.state.password !== this.state.confirmPassword ){
                  this.setState({ passwordNotMatched : true })
          }

          else {


            if (this.props.userInfo.isSeller) {
              
            }


            this.props.updateUserProfile({ 

              userId: this.props.user._id, 
              name :  this.state.name === "purenullxxx" ? this.props.user.name : this.state.name , 
              email :  this.state.email === "purenullxxx" ? this.props.user.email : this.state.email , 
              password : this.state.password ,
              
              
              seller : this.props.userInfo.isSeller ?  
              {
                  name : this.state.sellername === "purenullxxx" ? this.props.user.seller.name : this.state.sellername ,
                  logo : this.state.sellerlogo === "purenullxxx" ? this.props.user.seller.logo : this.state.sellerlogo , 
                  description : this.state.sellerdescription === "purenullxxx" ? this.props.user.seller.description : this.state.sellerdescription ,
              } : undefined , 
              
            })


            console.log({ 

              userId: this.props.user._id, 
              name :  this.state.name === "purenullxxx" ? this.props.user.name : this.state.name , 
              email :  this.state.email === "purenullxxx" ? this.props.user.email : this.state.email , 
              password : this.state.password ,
              
              
              seller : this.props.userInfo.isSeller ?  
              {
                  name : this.state.sellername ,
                  logo : this.state.sellerlogo , 
                  description :  this.state.sellerdescription ,
              } : undefined , 
              
            });

          }


  }

        
        render() {

                const {user , loading2 , error2 , success , userInfo} = this.props 
                const {name , email , sellerdescription , sellername , sellerlogo } = this.state

                const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
                if (!this.props.userInfo) {
                        
                        this.props.history.push(redirect);
                }

                

return (
        <div>
        <button onClick={()=>{console.log(user)}} ></button>
        {!user ? (<div>loading...</div>):(
          <Fade cascade up>
        <div>
        
                                                
        <form className="form" onSubmit={this.submitHandler}>
                
                <div><h1>User Profile</h1></div>
        
          <>


            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                value={name === "purenullxxx" ? user.name : name }
                onChange={this.handleInput}
              ></input>
            </div>


            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email === "purenullxxx" ? user.email : email }
                onChange={this.handleInput}
                ></input>
            </div>


            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                onChange={this.handleInput}
                type="password"
                placeholder="Enter password"
              ></input>
            </div>


            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                onChange={this.handleInput}
                type="password"
                placeholder="Enter confirm password"
              ></input>
            </div>
            { this.state.passwordNotMatched && ( <div>password did not match</div> ) }

        
            {userInfo.isSeller && <>
            
              <div>
                <label htmlFor="sellername">Seller Name</label>
                <input
                  name="sellername"
                  id="sellername"
                  type="text"
                  placeholder="Enter seller Name"
                  value={sellername === "purenullxxx" ? user.seller.name : sellername }
                  onChange={this.handleInput}
                  ></input>
              </div>
            <div>
              <label htmlFor="sellerlogo">Logo</label>
              <input
                name="sellerlogo"
                id="sellerlogo"
                type="text"
                placeholder="Enter Logo"
                value={sellerlogo === "purenullxxx" ? user.seller.logo : sellerlogo }
                onChange={this.handleInput}
                ></input>
            </div>
            <div>
              <label htmlFor="sellerdescription">Description</label>
              <textarea 
              rows="5"
              name="sellerdescription"
              id="sellerdescription"
              type="text"
              placeholder="Enter Description"
              value={sellerdescription === "purenullxxx" ? user.seller.description : sellerdescription }
              onChange={this.handleInput}></textarea>

            </div>

            </>}
              





            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
              {success && (<div>user updated ! </div>)}
              {loading2 && (<div>wait a while...  </div>)}
              {error2 && (<div>email already exist</div>)}
            </div>


          </>
          
      </form>


      
                                                
</div>
</Fade>
                                )

                                }
                                        




                                
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


        success : state.userUpdateProfile.success ,
        loading2 : state.userUpdateProfile.loading , 
        error2 : state.userUpdateProfile.error , 



        }),
        {
           
          userDetails , updateUserProfile , updateUserProfileReset
          
        } 
      
)(userProfileScreen);