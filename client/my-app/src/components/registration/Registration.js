import React from 'react'
import Input from '../input/Input'
import { useState } from 'react'
import { registration } from '../../actions/apiRequests';


const Registration = () => {
	const [username, setName] = useState('');
	const [password, setPassword] = useState("");
	return (
    <div className="registration">
      <div className="registration__header">Registration</div>
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

      <button className="registration__btn" onClick={()=>registration(username,password)}>Enter</button>
    </div>
  );
}

export default Registration
