import React from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const NavBar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  return (
    <Navbar bg="dark" variant="dark" style={{padding:"30px 0 30px 0",overflow:"hidden"}}>
      <Container>
        <div >
          <NavLink style={{ color: "white", textDecoration: "none" }} to="/user">
            CVE Posts
          </NavLink>
        </div>

        {isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"primary"}
              className="ml-2"
              onClick={() => dispatch(logout())}
            >
              <NavLink
                to="/"
                style={{ color: "white", textDecoration: "none" }}
              >
                Вийти
              </NavLink>
            </Button>
            {role === 1 ? (
              <>
                <Button
                  variant={"outline-primary"}
                  className="ml-2"
                  style={{ marginLeft: "20px" }}
                >
                  <NavLink
                    to="/reqPosts"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Підтвердити пости
                  </NavLink>
                </Button>

                <Button
                  variant={"outline-primary"}
                  className="ml-2"
                  style={{ marginLeft: "20px" }}
                >
                  <NavLink
                    to="/seeUsers"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Користувачі
                  </NavLink>
                </Button>
                <Button
                  variant={"outline-primary"}
                  className="ml-2"
                  style={{ marginLeft: "20px" }}
                >
                  <NavLink
                    to="/createPostA"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Додати пост
                  </NavLink>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"outline-primary"}
                  className="ml-2"
                  style={{ marginLeft: "20px" }}
                >
                  <NavLink
                    to="/notifications"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Сповіщення
                  </NavLink>
                </Button>
                <Button
                  variant={"outline-primary"}
                  className="ml-2"
                  style={{ marginLeft: "20px" }}
                >
                  <NavLink
                    to="/myPosts"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    МоЇ пости
                  </NavLink>
                </Button>
                <Button
                  variant={"outline-primary"}
                  className="ml-2"
                  style={{ marginLeft: "20px" }}
                >
                  <NavLink
                    to="/createPostU"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Додати пост
                  </NavLink>
                </Button>
              </>
            )}
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button variant={"outline-primary"} style={{ marginLeft: "20px" }}>
              <NavLink
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Ввійти
              </NavLink>
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
