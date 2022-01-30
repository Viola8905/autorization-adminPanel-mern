import axios from "axios";
import { setAdmin, setUser } from "../reducers/userReducer";

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
      localStorage.setItem("token", response.data.token);

      //console.log(response.data.user.roles);
      if (response.data.user.roles == "USER") {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(setAdmin(response.data.user));
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const deletePost = (id) => {
  return async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
     
      //console.log(response.data);
      alert("deleted bootcamp with id" + id);
    } catch (e) {
      alert("You are not an admin");
      console.log(e.response.data + "post was not deleted");
      console.log(JSON.stringify(e.response));
      localStorage.removeItem("token");
    }
  };
};

export const createPost = (arr) => {
  return async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        arr,
      });
      alert("Post was  added");
    } catch (e) {
      alert("Post was not added");
      console.log(JSON.stringify(e.response));
      console.log(e.response.data);
    }
  };
};
