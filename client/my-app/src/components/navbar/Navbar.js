import React from 'react'
import './navbar.css'
import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
const Navbar = () => {
	const isAuth = useSelector((state) => state.user.isAuth);
	
	const dispatch = useDispatch()


	const navigate = useNavigate();
    function Navigate() {
      navigate(`/posts`);
    }
	return (
    <div className="navbar">
      {!isAuth && (
        <div className="navbar__login">
          <NavLink to="/login">login</NavLink>
        </div>
      )}
      {!isAuth && (
        <div className="navbar__registration">
          <NavLink to="/registration">registration</NavLink>
        </div>
      )}
      {isAuth  && (
        <div className="navbar__logout" onClick={() => dispatch(logout())}>
          logout
        </div>
      )}
    </div>
  );
}

export default Navbar
