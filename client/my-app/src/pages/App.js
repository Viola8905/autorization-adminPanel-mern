import React from "react";
import Navbar from "../components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import UserPage from "./UserPage";
import ItemPage from "./ItemPage";
import Admin from "./AdminPage";
import MainPage from "./MainPage";
import AuthPage from './AuthPage';
import ReqPosts from "./ReqPosts";
import SeeUsers from "./SeeUsers";
import MyPosts from './MyPosts';
function App() {
  
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.role);
	const user = useSelector((state) => state.user.currentUser.username);

	

  function renderElement(isAuth, role) {
    if (!isAuth) {
      return (
        <Routes>
          <Route exact path="/registration" element={<AuthPage />} />
          Ctrl + click on "Main" to reach a code of this page
          <Route exact path="/login" element={<AuthPage />} />
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/:mainId" element={<ItemPage />} />
          <Route exact path="/user" element={<AuthPage />} />
        </Routes>
      );
    } else if (isAuth && role === 1) {
      return (
        <Routes>
          <Route exact path="/user" element={<Admin />} />
          <Route exact path="/:mainId" element={<ItemPage />} />
          <Route exact path="/reqPosts" element={<ReqPosts />} />
          <Route exact path="/seeUsers" element={<SeeUsers />} />
        </Routes>
      );
    } else if (isAuth && role === 0) {
      return (
        <Routes>
          <Route exact path="/user" element={<UserPage />} /> // Ctrl + click on
          "Main" to reach a code of this page
          <Route exact path="/:mainId" element={<ItemPage />} />
          <Route exact path="/myPosts" element={<MyPosts/>} />
        </Routes>
      );
    } else {
      return null;
    }
  }


  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="wrap">
         
          {renderElement(isAuth, role)}

        </div>
      </Router>
    </div>
  );
}

export default App;
