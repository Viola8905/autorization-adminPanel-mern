import React from 'react'
import './navbar.css'
import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
const NavBar = () => {
	const isAuth = useSelector((state) => state.user.isAuth);
	
	const dispatch = useDispatch()
	const role = useSelector((state) => state.user.role);


   
	return (
    // <div className="navbar">
    //   {!isAuth && (
    //     <div className="navbar__login">
    //       <NavLink to="/login">login</NavLink>
    //     </div>
    //   )}
    //   {!isAuth && (
    //     <div className="navbar__registration">
    //       <NavLink to="/registration">registration</NavLink>
    //     </div>
    //   )}
    //   {isAuth  && (
    //     <div className="navbar__logout" onClick={() => dispatch(logout())}>
    //       logout
    //     </div>
    //   )}
    // </div>

    <Navbar bg="dark" variant="dark">
      <Container>
        <div onClick={() => dispatch(logout())}>
          <NavLink style={{ color: "white" }} to="/">
            CVE Posts
          </NavLink>
        </div>

        {isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            {/* <Button variant={"outline-light"}>Админ панель</Button> */}
            <Button
              variant={"outline-light"}
              className="ml-2"
              onClick={() => dispatch(logout())}
            >
              <NavLink to="/">Выйти</NavLink>
            </Button>
            {role === 1 ? (
              <>
                <Button variant={"outline-light"} className="ml-2">
                  <NavLink to="/reqPosts">Подтвердить посты</NavLink>
                </Button>

                <Button variant={"outline-light"} className="ml-2">
                  <NavLink to="/seeUsers">Пользователи</NavLink>
                </Button>
              </>
            ) : (
              <Button variant={"outline-light"} className="ml-2">
                <NavLink to="/myPosts">Мои посты</NavLink>
              </Button>
            )}
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button variant={"outline-light"}>
              <NavLink to="/registration">Войти</NavLink>
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar
