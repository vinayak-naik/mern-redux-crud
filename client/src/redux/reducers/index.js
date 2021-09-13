import React from "react";
import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./userReducers";
import { customerListReducer, customerDetailsReducer, customerCreateReducer, customerDeleteReducer, customerUpdateReducer} from "./customerReducers";

const RootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  customerList: customerListReducer,
  customerDetails:customerDetailsReducer,
  customerCreate:customerCreateReducer,
  customerDelete:customerDeleteReducer,
  customerUpdate:customerUpdateReducer,
});

export default RootReducer;
