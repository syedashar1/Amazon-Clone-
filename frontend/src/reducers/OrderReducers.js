import {
        ORDER_CREATE_FAIL,
        ORDER_CREATE_REQUEST,
        ORDER_CREATE_RESET,
        ORDER_CREATE_SUCCESS,
        ORDER_DELETE_FAIL,
        ORDER_DELETE_REQUEST,
        ORDER_DELETE_RESET,
        ORDER_DELETE_SUCCESS,
        ORDER_DETAILS_FAIL,
        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_LIST_FAIL,
        ORDER_LIST_REQUEST,
        ORDER_LIST_SUCCESS,
        ORDER_MINE_LIST_FAIL,
        ORDER_MINE_LIST_REQUEST,
        ORDER_MINE_LIST_SUCCESS,
        ORDER_DELIVER_REQUEST,
        ORDER_DELIVER_SUCCESS,
        ORDER_DELIVER_FAIL,
        ORDER_DELIVER_RESET,
        COUPON_LIST_REQUEST,
        COUPON_LIST_SUCCESS,
        COUPON_LIST_FAIL,
        COUPON_CREATE_REQUEST,
        COUPON_CREATE_SUCCESS,
        COUPON_CREATE_FAIL,
        COUPON_DELETE_REQUEST,
        COUPON_DELETE_SUCCESS,
        COUPON_DELETE_FAIL,
        COUPON_DELETE_RESET,
        COUPON_CREATE_RESET,
        COUPON_FIND_REQUEST,
        COUPON_FIND_SUCCESS,
        COUPON_FIND_FAIL,
        COUPON_FIND_RESET,
} from '../types/productTypes';
      
export const orderCreateReducer = (state = {}, action) => {
        switch (action.type) {
          case ORDER_CREATE_REQUEST:
            return { loading: true };
          case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
          case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
          case ORDER_CREATE_RESET:
            return {};
          default:
            return state;
        }



        
};




export const orderDetailsReducer = ( 

  state = { }
  , 
  action 

  ) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload , success: true, };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const orderMineListReducer = (state = { orders: [] }, action) => {
  
  
  switch (action.type) {

    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };

    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;


  }
};



export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      console.log('request');
      return { loading: true , id : action.payload };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true , id : null };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};



export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};



export const couponListReducer = (state = { }, action) => {
  switch (action.type) {
    case COUPON_LIST_REQUEST:
      return { loading: true };
    case COUPON_LIST_SUCCESS:
      console.log(action.payload);
      return { loading: false, coupons : action.payload };
    case COUPON_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const couponCreateReducer = (state = { }, action) => {
  switch (action.type) {
    case COUPON_CREATE_REQUEST:
      return { loading: true };
    case COUPON_CREATE_SUCCESS:
      return { loading: false, success : true };
    case COUPON_CREATE_FAIL:
      return { loading: false, error: action.payload };
      case COUPON_CREATE_RESET:
        return { }; 
    default:
      return state;
  }
};
export const couponDeleteReducer = (state = { }, action) => {
  switch (action.type) {
    case COUPON_DELETE_REQUEST:
      return { loading: true };
    case COUPON_DELETE_SUCCESS:
      return { loading: false, coupon: action.payload };
    case COUPON_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COUPON_DELETE_RESET:
      return { };    
    default:
      return state;
  }
};



export const couponFindReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_FIND_REQUEST:
      return { loading: true };
    case COUPON_FIND_SUCCESS:
      return { loading: false, coupon: action.payload };
    case COUPON_FIND_FAIL:
      return { loading: false, error: true };
    case COUPON_FIND_RESET:
      return { };    
    default:
      return state;
  }
};