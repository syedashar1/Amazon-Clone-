import Axios from 'axios';
import { 
  CART_ADD_ITEM , CART_REMOVE_ITEM , CART_SAVE_SHIPPING_ADDRESS ,
  CART_SAVE_PAYMENT_METHOD, 
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_FAIL_RESET
} from '../types/productTypes';




export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  const { cart: { cartItems } } = getState();
  console.log(cartItems[0]);
  if (cartItems.length > 0 && data.seller !== cartItems[0].seller) {
    console.log('cant add to cart');
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: cartItems[0].seller,
    });
  } else {
    dispatch({ type : CART_ADD_ITEM_FAIL_RESET })
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        title: data.title,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem( 'cartItems', JSON.stringify(getState().cart.cartItems)
    );
  }

};



export const removeFromCart = (product) => (dispatch , getState ) => {

  console.log(product);
  const cartItems = getState().cart.cartItems.slice().filter( (x) => x.product !== product )

  console.log(cartItems);


  dispatch({
          type : CART_REMOVE_ITEM ,
          payload : {cartItems}
  })

  localStorage.setItem( "cartItems" , JSON.stringify(cartItems))

};





export const saveShippingAddress = (data) => (dispatch) => {

        console.log(data);
        dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
        localStorage.setItem('shippingAddress', JSON.stringify(data));

};


export const savePaymentMethod = (data) => (dispatch) => {


  console.log(data);
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem('shippingMethod', JSON.stringify(data));


};

