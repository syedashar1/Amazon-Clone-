import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signin , signout , register } from '../actions/userActions' ;

class RegisterScreen extends Component {

        constructor(){
                super();
                this.state = {
                        name : "" , 
                        email : "" , 
                        password : "" ,
                        confirmPassword : "" ,
                        passwordNotMatched : false
                }
        }




        

        // async componentDidMount(){
                
        //         const redirect = this.props.location.search
        //                 ? this.props.location.search.split('=')[1]
        //                 : '/';
                

        //                 if ( await this.props.userInfo) {
        //                         this.props.history.push(redirect);
        //                 }



        // }





         submitHandler  = async (e)  => {
                e.preventDefault()
                console.log(this.state);

                if( this.state.password !== this.state.confirmPassword ){
                        this.setState({ passwordNotMatched : true })
                }
                else {
                this.props.register( this.state.name , this.state.email , this.state.password)

                }


        }

render() {

        const redirect = this.props.location.search
        ? this.props.location.search.split('=')[1]
        : '/something';
        if (this.props.userInfo) {
                
                this.props.history.push('/');
        }


        return (
        <div>

                <button onClick={()=>{console.log(this.props.signinError)} }>click</button>

                <form className="form" onSubmit={this.submitHandler}>
                <div>
                        <h1>Register a New User</h1>
                </div>
                <div>
                <label htmlFor="name">Name</label>
                <input type="name" id="name" placeholder="Enter name" required onChange={(e) => this.setState({ name : e.target.value})}></input>
                </div>
                <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" placeholder="Enter email" required onChange={(e) => this.setState({ email : e.target.value})}></input>
                </div>
                <div>
                {this.props.registerError && (<> {this.props.registerError } </>)}
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" required onChange={(e) => this.setState({ password : e.target.value})}></input>
                </div>
                <div>
                <label htmlFor="confirmPassword">confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm password" required onChange={(e) => this.setState({ confirmPassword : e.target.value})}></input>
                </div>
                <div>

                { this.state.passwordNotMatched && ( <div>password did not match</div> )

                }

                <label />
                        <button className="primary" type="submit"> Sign In </button>
                        
                </div>
                <div>
                        <label />
                        <div>Already have an account ?{' '}
                                <Link to={`/signin`}>
                                Sign In
                                </Link>     
                        </div>
                </div>
                        </form>


                


    </div>
                )
        }
}



export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                registerError : state.userRegister.error
        
        
        }),
        {
                signin , signout , register
        }

)(RegisterScreen);

