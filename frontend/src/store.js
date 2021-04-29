import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {   productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productUpdateReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {  userRegisterReducer, userSigninReducer , getDetailsReducer , userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer, userTopSellerListReducer } from './reducers/userReducers';
import { couponCreateReducer, couponDeleteReducer, couponFindReducer, couponListReducer, orderCreateReducer , orderDeleteReducer, orderDeliverReducer, orderDetailsReducer ,orderListReducer,orderMineListReducer } from './reducers/OrderReducers';



const initialState = {};


const reducer = combineReducers({

  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin : userSigninReducer ,
  userRegister : userRegisterReducer ,
  orderCreate: orderCreateReducer,
  orderDetails : orderDetailsReducer ,
  orderMineList: orderMineListReducer,
  getDetails : getDetailsReducer , 
  userUpdateProfile : userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate : productUpdateReducer ,
  productDelete : productDeleteReducer ,
  orderList : orderListReducer ,
  orderDelete : orderDeleteReducer ,
  orderDeliver : orderDeliverReducer ,
  userList : userListReducer ,
  userDelete : userDeleteReducer ,
  userUpdate: userUpdateReducer,
  userTopSeller : userTopSellerListReducer ,
  productReviewCreate: productReviewCreateReducer,
  productCategoryList: productCategoryListReducer,
  couponList : couponListReducer,
  couponCreate:couponCreateReducer,
  couponDelete : couponDeleteReducer ,
  couponFind : couponFindReducer ,


  
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;