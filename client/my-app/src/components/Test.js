import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { deletePost } from "../actions/user";

import axios from "axios";
import { setUser } from "../reducers/userReducer";
import { store } from "../reducers";

const Test = () => {
  const [users, setUsers] = useState([]);
  const [bootcamps, setBootcamps] = useState([]);
  const [role, setRole] = useState([]);

  //

  const dispatch = useDispatch();

  
  useEffect(() => {
    const Users = () => {
      return async (dispatch) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          console.log(response.data);
          setUsers(response.data);
        } catch (e) {
          console.log(e.response.data.user);
          localStorage.removeItem("token");
        }
      };
    };

    dispatch(Users());
  }, []);

  useEffect(() => {
    const Bootcamps = () => {
      return async (dispatch) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/bootcamps`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(response.data);
          setBootcamps(response.data);
        } catch (e) {
          console.log(e.response.data);
          localStorage.removeItem("token");
        }
      };
    };
    dispatch(Bootcamps());
  }, []);

  const removeTask = (id) => {
    dispatch(deletePost(id));
    setBootcamps([...bootcamps.filter((bootcamp) => bootcamp._id !== id)]);
  };

  return (
    <div>
      <div className="">
        {users.map((user) => (
          <div item key={user._id}>
            <div className="">{user.username}</div>
          </div>
        ))}
      </div>
      Hello
      <div className="">
        {bootcamps.map((bootcamp) => (
          <div item key={bootcamp._id}>
            <div className="">
              {bootcamp.price}
              <button onClick={() => removeTask(bootcamp._id)}>
                Delete
                {/* dispatch(deletePost(bootcamp)) */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
