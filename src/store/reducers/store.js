import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import { adminReducer } from "./adminReducer";
import { orderReducer } from "./orderReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
  ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
  : [];


const initialState = {
  auth: { user : user,selectedUserCheckoutAddress },
  carts: { cart: cartItems },
  
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    error: errorReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
    admin: adminReducer,
    orders: orderReducer
  },
  preloadedState: initialState,
});

export default store;
