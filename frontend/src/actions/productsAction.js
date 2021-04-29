import Axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_CREATE_RESET,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
} from '../types/productTypes';

export const listProducts = ({ seller = '' , title = ''  , category='', order = '',min = 0,max = 0, rating = 0,   pageNumber = '',}) => async (dispatch) => {
  dispatch({type : PRODUCT_CREATE_RESET})
  dispatch({  type: PRODUCT_LIST_REQUEST });
  dispatch({  type: PRODUCT_DELETE_RESET });

  try {
    console.log(seller);
    const { data } = await Axios.get(

      `/api/products?pageNumber=${pageNumber}&seller=${seller}&title=${title}&min=${min}&max=${max}&rating=${rating}&order=${order}&category=${category}`
      
      );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};


export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({type : PRODUCT_REVIEW_CREATE_RESET })
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const userInfo = getState().userSignin.userInfo
  try {
    const { data } = await Axios.post(
      '/api/products',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    console.log(data);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};


export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({type : PRODUCT_CREATE_RESET})
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};


export const updateProductRESET = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_RESET});
};

export const deleteREST = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_RESET});
};




export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: PRODUCT_DELETE_SUCCESS , payload: productId});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};



export const createReview = (productId, review) => async ( dispatch,getState) => {

  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  const userInfo = getState().userSignin.userInfo

  try {
    const { data } = await Axios.post( `/api/products/${productId}/reviews`, review ,
      { headers: { Authorization: `Bearer ${userInfo.token}` }  }
    );
    dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review });


  } 
  
  catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
  }
};



export const listProductCategories = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST });
  try { const { data } = await Axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data }); } 
  catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};
