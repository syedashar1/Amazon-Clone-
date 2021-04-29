import React , {useEffect , useState} from 'react';
import "./main.css"
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import Navbar from './components/Navbar';
import SignIn from './screens/SignIn';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymeentMethodScreen from './screens/PaymeentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import orderScreen from './screens/orderScreen';
import orderHistory from './screens/orderHistory';
import userProfileScreen from './screens/userProfileScreen';
import productListsScreen from './screens/productListsScreen';
import EditProduct from './screens/EditProduct';
import orderListScreen from './screens/orderListScreen';
import userLists from './screens/userLists';
import editUserByAdmin from './screens/editUserByAdmin';
import sellerScreens from './screens/sellerScreens';
import SearchScreen from './screens/SearchScreen';
import couponScreens from './screens/couponScreens';


class App extends React.Component {








    render(){


        return(


        <BrowserRouter>
        <div className="grid-container">

            <Navbar/>
            
            <main>
                <Route path="/product/:id" component={ProductScreen} exact></Route>
                <Route path="/order/:id" component={orderScreen}></Route>
                <Route path="/payment" component={PaymeentMethodScreen}></Route>
                <Route path="/profile" component={userProfileScreen}></Route>
                <Route path="/shipping" component={ShippingAddressScreen}></Route>
                <Route path="/seller/:id" component={sellerScreens}></Route>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/signin" component={SignIn}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                <Route path="/orderhistory" component={orderHistory}></Route>
                <Route path="/product/:id/edit" component={EditProduct} exact ></Route>
                <Route path="/productlist" component={productListsScreen} exact></Route>
                <Route path="/orderlist" component={orderListScreen} exact></Route>
                <Route path="/userlist" component={userLists} exact></Route>
                <Route path="/user/:id/edit" component={editUserByAdmin}></Route>
                <Route path="/productlist/seller" component={productListsScreen} ></Route>
                <Route path="/orderlist/seller" component={orderListScreen} ></Route>
                <Route path="/coupon" component={couponScreens} ></Route>
                <Route path="/" component={HomeScreen} exact></Route>
                <Route path="/search/title/:title?" component={SearchScreen} exact></Route>
                <Route 
                    path="/search/category/:category/title/:title/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                    component={SearchScreen} exact
                ></Route>
                <Route path="/productlist/pageNumber/:pageNumber" component={productListsScreen} exact ></Route>
                

            </main>
            <footer className="row center">All right reserved</footer>
        </div>
        </BrowserRouter>


                
    
    
          )

    }


}


export default App;
 