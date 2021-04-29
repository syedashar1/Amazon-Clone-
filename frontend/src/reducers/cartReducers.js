import { CART_ADD_ITEM , CART_REMOVE_ITEM ,  CART_ADD_ITEM_FAIL_RESET ,CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_EMPTY, CART_ADD_ITEM_FAIL } from '../types/productTypes';

export const cartReducer = (
  
  state = { 
    
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],


    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},



    paymentMethod : localStorage.getItem('shippingMethod')
    ? JSON.parse(localStorage.getItem('shippingMethod'))
    : {},
    

    
    } 

      
  , action) => {


  switch (action.type) {


    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      console.log(state.cartItems);
      if (existItem) {
      
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }


    case CART_REMOVE_ITEM :
      return {
        ...state , 
        cartItems :  action.payload.cartItems
      }


    case CART_SAVE_SHIPPING_ADDRESS:
      return { 
        ...state,
        shippingAddress: action.payload };

        case CART_SAVE_PAYMENT_METHOD:
      return { 
        ...state,
        paymentMethod: action.payload };


        case CART_EMPTY:
          return { ...state, cartItems: [] };

        case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };

        case CART_ADD_ITEM_FAIL_RESET :
          return { ...state , error : null }

    
    default:
      return state;
  }
};