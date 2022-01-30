import React from "react";
import Navbar from "./navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import { useDispatch, useSelector } from "react-redux";
import Test from "./Test";
import { useEffect } from "react";
import PostsPage from "./UserPage";
import ItemPage from "./ItemPage";
import Admin from "./AdminPage";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.role);

  function renderElement(isAuth, role) {
    if (!isAuth) {
      return (
        <Routes>
          <Route exact path="/registration" element={<Registration />} /> //
          Ctrl + click on "Main" to reach a code of this page
          <Route exact path="/login" element={<Login />} />
        </Routes>
      );
    } else if (isAuth && role === 1) {
      return (
        <Routes>
          <Route exact path="/login" element={<Admin />} />
        </Routes>
      );
    } else if (isAuth && role === 0) {
      return (
        <Routes>
          <Route exact path="/login" element={<PostsPage />} /> // Ctrl + click
          on "Main" to reach a code of this page
          <Route exact path="/:mainId" element={<ItemPage />} />
        </Routes>
      );
    } else {
      return null;
    }
  }

  console.log(role);
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="wrap">
          {/* {!isAuth ? (
            <Routes>
              <Route exact path="/registration" element={<Registration />} /> //
              Ctrl + click on "Main" to reach a code of this page
              <Route exact path="/login" element={<Login />} />
            </Routes>
          ) : (
            <Routes>
              <Route exact path="/login" element={<PostsPage />} /> // Ctrl +
              click on "Main" to reach a code of this page
              <Route exact path="/:mainId" element={<ItemPage />} />
            </Routes>
          )}  */}
          {renderElement(isAuth, role)}
        </div>
      </Router>
    </div>
  );
}

export default App;
