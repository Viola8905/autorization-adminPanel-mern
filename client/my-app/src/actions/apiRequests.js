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
		
      alert("User is registered");
    } catch (e) {
      localStorage.removeItem("token");
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
			localStorage.removeItem("token");
      alert(e.response.data.message);
    }
  };
};

export const deletePost = (id,success,failure) => {
  return async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if(response.data.success == true){
				success();
			}else{
				failure();
			}

      alert("deleted bootcamp with id"  );
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
			if (response.data.success == true) {
        success();
				alert("Post was  added");
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

// export const updatePost = (post,postId) => {
//   return async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/posts/${postId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             //Accept: "application/json",
// 					 'Content-Type': 'application/json'

//           },
// 					body: JSON.stringify(post)
//         }
//       );
			
// 			console.log(response.data.data);
//       alert("Post was updated");
//     } catch (e) {
//       alert("Post was not updated");
//       console.log(JSON.stringify(e.response));
//       console.log(e.response.data);
//     }
//   };
// };



