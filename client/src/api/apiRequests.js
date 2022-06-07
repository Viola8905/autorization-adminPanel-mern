import axios from "axios";
import { getUser, setAdmin, setUser } from "../reducers/userReducer";

export const registration = async (username, password, platform) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/registration`,
      {
        username,
        password,
        platform,
      }
    );

    alert("User is registered");
  } catch (e) {
    //localStorage.removeItem("token");
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
      console.log(response.data.user.roles);
      if (response.data.user.roles.includes("ADMIN")) {
        dispatch(setAdmin(response.data.user));
      } else {
        dispatch(setUser(response.data.user));
      }
    } catch (e) {
      localStorage.removeItem("token");
      alert(e.response.data.message);
    }
  };
};

export const deletePost = (id, success, failure) => {
  return async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success === true) {
        success();
      } else {
        failure();
      }
    } catch (e) {
      alert("You are not an admin");
      console.log(e.response.data + "post was not deleted");
      console.log(JSON.stringify(e.response));
    }
  };
};

export const createPost = (arr, success, failure) => {
  return async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        arr,
      });
      if (response.data.success === true) {
        success();
        //alert("Post was added");
      } else {
        alert("Title must be unique");
        failure();
      }
    } catch (e) {
      alert("Post was not added");
      console.log(JSON.stringify(e.response));
      console.log(e.response.data);
    }
  };
};

export const updatePost = (arr, success, failure) => {
  return async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${arr._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          arr,
        }
      );

      if (response.data.success === true) {
        success();
        alert("Post was added");
      } else {
        alert("Title must be unique");
        failure();
      }
      success();
    } catch (e) {
      failure();
      console.log(e.response.data);
      console.log(JSON.stringify(e.response));
    }
  };
};

export const createReqPost = (arr) => {
  return async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/reqPosts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        arr,
      });

      alert("Post is waiting for confirm");
    } catch (e) {
      alert("Title field must be unique");
      console.log(JSON.stringify(e.response));
      console.log(e.response.data);
    }
  };
};

export const moveReqPost = (arr) => {
  return async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/reqPosts/move`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          arr,
        }
      );

      //alert("Post was added into main db");
    } catch (e) {
      alert("Post was not added");
      console.log(JSON.stringify(e.response));
      console.log(e.response.data);
    }
  };
};

export const moveToRejected = (arr) => {
  return async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/reqPosts/reject`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          arr,
        }
      );
      //alert("Post was added into main db");
    } catch (e) {
      alert("Post was not added");
      console.log(JSON.stringify(e.response));
      console.log(e.response.data);
    }
  };
};

export const deleteReqPost = (id, success, failure) => {
  return async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/reqPosts/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success === true) {
        success();
      } else {
        failure();
      }

      //alert("deleted bootcamp with id");
    } catch (e) {
      alert("You are not an admin");
      console.log(e.response.data + "post was not deleted");
      console.log(JSON.stringify(e.response));
    }
  };
};

export const deleteUser = (id, success, failure) => {
  return async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success === true) {
        success();
      } else {
        failure();
      }

      //alert("deleted bootcamp with id"  );
    } catch (e) {
      alert("You are not an admin");
      console.log(e.response.data + "user was not deleted");
      console.log(JSON.stringify(e.response));
    }
  };
};

// moved logic to NotificationsPage
// export const deleteNotification = (id, success, failure) => {
//   return async () => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/notifications/${id}`
//       );

//       if (response.data.success === true) {
//         success();
//       } else {
//         failure();
//       }
//     } catch (e) {
//       console.log(e.response.data + "post was not deleted");
//       console.log(JSON.stringify(e.response));
//     }
//   };
// };
