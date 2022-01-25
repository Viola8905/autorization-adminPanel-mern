import React from "react";
import Input from "../input/Input";
import { useState } from "react";
import { login } from "../../actions/user";
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	function Navigate(){
		navigate(`/`)
	}

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
	const dispatch = useDispatch()
  return (
    <div className="login">
      <div className="login__header">login</div>
      <Input
        value={username}
        setValue={setName}
        type="text"
        placeholder="enter your name"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="enter your password"
      />

      <button
        className="login__btn"
        onClick={() => dispatch(login(username, password))}
				
        
      >
        Enter
      </button>
    </div>
  );
};

export default Login;
