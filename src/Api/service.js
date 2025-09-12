import { POST_CUSTOMER_AGENT, 
        POST_CUSTOMER_COMPANY, 
        POST_CUSTOMER_INDIVIDUAL,
        GET_CUSTOMER_LIST,
        UPDATE_CUSTOMER_LIST,CUSTOMER_STATUS_UPDATE,
        POST_ORDER,GET_ORDER,UPDATE_ORDER,DASHBOARD_DATA } from "./endpoint";
        // src/services/apiService.js
import axios from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// COMPANY POST method wrapper
export const ADD_COMPANY = async ( data) => {
  try {
    const response = await api.post(POST_CUSTOMER_COMPANY, data, {
      headers: {
        customerType: 'company',
      },
    });
    return response.data;
  } catch (error) {
    console.error("API POST error:", error.response?.data || error.message);
    throw error.response?.data || error; 
  }
};

// AGENT POST method wrapper
export const ADD_AGENT = async ( data) => {
    try {
      const response = await api.post(POST_CUSTOMER_AGENT, data,{
        headers: {
          customerType: 'agent',
        },
      });
      return response.data;
    } catch (error) {
      console.error("API POST error:", error.response?.data || error.message);
      throw error.response?.data || error; 
    }
  };

 // INDIVIDUAL POST method wrapper
export const ADD_INDIVIDUAL = async ( data,) => {
    try {
      const response = await api.post(POST_CUSTOMER_INDIVIDUAL, data,{
        headers: {
          customerType: 'individual',
        },
      });
      return response.data;
    } catch (error) {
      console.error("API POST error:", error.response?.data || error.message);
      throw error.response?.data || error; 
    }
  }; 

  export const GET_CUSTOMERS = async (customerType) => {
    try {
      const response = await api.get(GET_CUSTOMER_LIST+`?customerType=${customerType}`);
      return response.data;
    } catch (error) {
      console.error("API GET error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  export const UPDATE_CUSTOMERS = async (data,companyType,customerId) => {
    try {
      const response = await api.put(UPDATE_CUSTOMER_LIST,data,{
        headers: {
          customerType: companyType,
          customerId:customerId
        },
      });
      return response.data;
    } catch (error) {
      console.error("API GET error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  export const CUSTOMER_UPDATE_STATUS = async (status,customerId) => {
    try {
      const response = await api.delete(CUSTOMER_STATUS_UPDATE,{
        headers: {
          isdelete:status === 'Active' ? true : false,
          customerId:customerId
        },
      });
    
      return response.data;
    } catch (error) {
      console.error("API GET error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  export const POST_ORDERS = async (data) => {
    try {
      const response = await api.post(POST_ORDER, data);
      return response.data;
    } catch (error) {
      console.error("API POST error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  export const GET_ORDERS = async () => {
    try {
      const response = await api.get(GET_ORDER);
      return response.data;
    } catch (error) {
      console.error("API GET error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  export const UPDATE_ORDERS = async (data,orderId) => {
    try {
      const response = await api.put(UPDATE_ORDER,data,{
        headers: {
          orderAID:orderId,
          orderId:orderId
        },
      });
      return response.data;
    } catch (error) {
      console.error("API PUT error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  export const GET_DASHBOARD_DATA = async () => {
    try {
      const response = await api.get(DASHBOARD_DATA);
      return response.data;
    } catch (error) {
      console.error("API GET error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };
    