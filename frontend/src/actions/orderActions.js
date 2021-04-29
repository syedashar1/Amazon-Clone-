import Axios from 'axios';

import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, CART_EMPTY , COUPON_FIND_REQUEST , COUPON_FIND_SUCCESS , COUPON_FIND_FAIL , COUPON_FIND_RESET,ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_MINE_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_RESET, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, COUPON_LIST_REQUEST, COUPON_LIST_SUCCESS, COUPON_LIST_FAIL, COUPON_CREATE_REQUEST, COUPON_CREATE_SUCCESS, COUPON_DELETE_FAIL, COUPON_CREATE_FAIL, COUPON_DELETE_RESET, COUPON_CREATE_RESET, COUPON_DELETE_REQUEST, COUPON_DELETE_SUCCESS, } from '../types/productTypes';



export const createOrder = (order) => async (dispatch, getState) => {

        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
        console.log(order);

        try {
          
        const userInfo = order.userInfo
        console.log(userInfo.token); 

        const { data } = await Axios.post('/api/orders', order, {
                headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                },
          });

          console.log(data);

          dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
          dispatch({ type: CART_EMPTY });
          localStorage.removeItem('cartItems');

        } 
        
        
        catch (error) {
          console.log(error);

          dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
      };





export const detailsOrder = (orderId) => async (dispatch, getState) => {


    
    dispatch({ type: ORDER_CREATE_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
  
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

    // const { userSignin: { userInfo } }  = getState();
    const userInfo = getState().userSignin.userInfo
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};






export const listOrderMine = () => async (dispatch, getState) => {

  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.get('/api/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};




export const listOrders = ({ seller = '' }) => async (dispatch, getState) => {

  dispatch({ type: ORDER_LIST_REQUEST });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.get(`/api/orders?seller=${seller}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};





export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};



export const deleteOrder = ( productId ) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: productId });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.delete(`/api/orders/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};




export const deleteREST = () => async (dispatch, getState) => {
  console.log('im fired');
  dispatch({ type: ORDER_DELETE_RESET});
};







export const listCoupons = () => async (dispatch, getState) => {
  dispatch({ type: COUPON_LIST_REQUEST });
  dispatch({ type: COUPON_CREATE_RESET });
  dispatch({ type: COUPON_DELETE_RESET });
  try {
    const userInfo = getState().userSignin.userInfo
    const { data } = await Axios.get("/api/orders/coupon", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: COUPON_LIST_SUCCESS , payload : data });
  } catch (error) {
  
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COUPON_LIST_FAIL, payload: message });
  }
};





export const createCoupon = (coupon) => async (dispatch, getState) => {

  dispatch({ type: COUPON_CREATE_REQUEST, payload: coupon });
  console.log(coupon);

  try {
     
  const userInfo = getState().userSignin.userInfo
  const { data } = await Axios.post('/api/orders/coupon', coupon, {
          headers: {
                  Authorization: `Bearer ${userInfo.token}`,
          },
    });
    dispatch({ type: COUPON_CREATE_SUCCESS, payload : data });

  } 
  
  
  catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COUPON_CREATE_FAIL, payload: message });
  }
};


export const searchCoupon = ( name ) => async (dispatch, getState) => {
  console.log(name);
  dispatch({ type: COUPON_FIND_REQUEST , payload: name });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.post(`/api/orders/coupon/${name}`, {name} ,{
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: COUPON_FIND_SUCCESS , payload : data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      console.log(message);
    dispatch({ type: COUPON_FIND_FAIL, payload: message });
  }
};


export const deleteCoupon = ( id ) => async (dispatch, getState) => {
  console.log(id);
  dispatch({ type: COUPON_DELETE_REQUEST , payload: id });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.delete(`/api/orders/coupon/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: COUPON_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      console.log(message);
    dispatch({ type: COUPON_DELETE_FAIL, payload: message });
  }
};