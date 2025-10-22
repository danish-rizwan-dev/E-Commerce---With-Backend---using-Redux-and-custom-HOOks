import { createStore } from "redux";

const initialState = {
  isAuth: localStorage.getItem("token") ? true : false,
  cartItems: [],
  search: ""
};

export const ACTION_TYPES = {
  updateIsAuth: "updateIsAuth",
  setCartItems: "setCartItems",
  setSearch: "setSearch"
}

function storeReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.updateIsAuth:
      return {
        ...state,
        isAuth: action.payload,
      };
    case ACTION_TYPES.setCartItems:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ACTION_TYPES.setSearch:
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
}


export const store = createStore(storeReducer);
