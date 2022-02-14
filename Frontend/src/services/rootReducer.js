import { combineReducers } from "redux";
//import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import cartReducer from "./cart/cartReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
});

export default rootReducer;