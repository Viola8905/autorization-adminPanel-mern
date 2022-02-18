import React, { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../api/apiRequests";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);


  const navigate = useNavigate();

  function Login(username, password) {
    dispatch(
      login(
        username,
        password,
        () => navigate("/user"),
        () => navigate("/login")
      )
    );
  }

  //console.log(location)
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto"> {isLogin ? " Login " : " Registration"} </h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-2"
            placeholder="enter name"
            value={username}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Form.Control
            className="mt-2"
            placeholder="enter password "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Row className=" d-flex justify-content-between  mt-3 pl-3 pr-3 ">
            {isLogin ? (
              <div className="">
                Don't have an account?
                <NavLink to="/registration">Register!</NavLink>
              </div>
            ) : (
              <div>
                Have an account?
                <NavLink to="/login">Login!</NavLink>
              </div>
            )}
            {isLogin ? (
              <div style={{ width: "100%" }}>
                <Button
                  variant={"outline-dark"}
                  onClick={() => Login(username, password)}
                >
                  Login
                </Button>
              </div>
            ) : (
              <div
                style={{ width: "100%" }}
                onClick={() => dispatch(registration(username, password))}
              >
                <Button variant={"outline-dark"}>Register</Button>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
