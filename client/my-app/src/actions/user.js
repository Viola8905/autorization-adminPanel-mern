import axios from "axios";
import { useState } from "react";

import { setUser } from "../reducers/userReducer";



export const registration = async (username, password) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/registration`,
      {
        username,
        password,
      }
    );
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        username,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

//  export const auth = () => {
//    return async (dispatch) => {
//      try {
//        const response = await axios.get(`http://localhost:5000/api/auth`, {
//          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//        });
//  			dispatch(setUser(response.data.user));
//  			localStorage.setItem('token',response.token);
//  			console.log(response.data);
//      } catch (e) {
//  			console.log(e.response.data.user);
//  			localStorage.removeItem('token')
//  		}
//    };
//  };


 export const deletePost = (id) => {

   return async () => {
     try {
       const response = await axios.delete(`http://localhost:5000/api/bootcamps/${id}`, {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
       });
			
			localStorage.setItem("token", response.data.token);
       console.log("deleted bootcamp with id"+id)
     } catch (e) {
      alert(e.response.data);
       localStorage.removeItem("token");
     }
   };
 };


 



 