import axios from "axios";
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_SUCCESS_REFRESH,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_SUCCESS_REFRESH,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_CREATE_REVIEW_REQUEST,
  CUSTOMER_CREATE_REVIEW_SUCCESS,
  CUSTOMER_CREATE_REVIEW_FAIL,
  CUSTOMER_TOP_REQUEST,
  CUSTOMER_TOP_SUCCESS,
  CUSTOMER_TOP_FAIL,
} from "../constants/customerConstants";
import { logout } from "./userActions";

export const listCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:7000/api/customer/",
      config
    );

    dispatch({
      type: CUSTOMER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const customerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:7000/api/customer/${id}`
    );

    dispatch({
      type: CUSTOMER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCustomer =
  (name, email, address, balance) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:7000/api/customer/`,
        { name, email, address, balance },
        config
      );

      dispatch({
        type: CUSTOMER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOMER_CREATE_FAIL,
        payload: message,
      });
    }
  };

  export const deleteCustomer = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`http://localhost:7000/api/customer/${id}`, config);
  
      dispatch({
        type: CUSTOMER_DELETE_SUCCESS,
      });
      dispatch({
        type: CUSTOMER_DELETE_SUCCESS_REFRESH,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOMER_DELETE_FAIL,
        payload: message,
      });
    }
  };


  export const updateCustomer = (customer, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_UPDATE_REQUEST,
      });
      console.log(id)
      console.log(customer)
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `http://localhost:7000/api/customer/${id}`,
        // `http://localhost:7000//api/customers/${id}`,
        customer,
        config
      );
      
  
      dispatch({
        type: CUSTOMER_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: CUSTOMER_UPDATE_SUCCESS_REFRESH});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOMER_UPDATE_FAIL,
        payload: message,
      });
    }
  };