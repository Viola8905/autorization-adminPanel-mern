import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import UserPage from "./UserPage";
import ItemPage from "./ItemPage";
import Admin from "./AdminPage";
import MainPage from "./MainPage";
import AuthPage from "./AuthPage";
import ReqPosts from "./ReqPosts";
import SeeUsers from "./SeeUsers";
import MyPosts from "./MyPosts";
import DebugPage from "./Debug";
import NavBar from "../components/navbar/NavBar";
import LevelOfPosts from "../components/LevelOfPosts";
import ReqPostDetails from "./ReqPostDetails";
import RejPostDetails from "./RejPostDetails";
import CreatePostU from "./CreatePostU";
import CreatePostA from "./CreatePostA";
import NotificationsPage from "./NotificationsPage";

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
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/:mainId" element={<ItemPage />} />
          <Route exact path="/user" element={<AuthPage />} />
          <Route exact path="/debug" element={<DebugPage />} />
          <Route exact path="/severity/:severity" element={<LevelOfPosts />} />
        </Routes>
      );
    } else if (isAuth && role === 1) {
      return (
        <Routes>
          <Route exact path="/" element={<Navigate to="/user" replace />} />
          <Route exact path="/user" element={<DebugPage />} />
          <Route exact path="/:mainId" element={<ItemPage />} />
          <Route exact path="/reqPosts" element={<ReqPosts />} />
          <Route exact path="/requested/:mainId" element={<ReqPostDetails />} />
          <Route exact path="/rejected/:mainId" element={<RejPostDetails />} />
          <Route exact path="/seeUsers" element={<SeeUsers />} />
          <Route exact path="/debug" element={<DebugPage />} />
          <Route exact path="/createPostA" element={<CreatePostA />} />
        </Routes>
      );
    } else if (isAuth && role === 0) {
      return (
        <Routes>
          <Route exact path="/" element={<Navigate to="/user" replace />} />
          <Route exact path="/user" element={<UserPage />} />
          <Route exact path="/:mainId" element={<ItemPage />} />
          <Route exact path="/myPosts" element={<MyPosts />} />
          <Route exact path="/debug" element={<DebugPage />} />
          <Route exact path="/notifications" element={<NotificationsPage />} />
          <Route exact path="/requested/:mainId" element={<ReqPostDetails />} />
          <Route exact path="/rejected/:mainId" element={<RejPostDetails />} />
          <Route exact path="/createPostU" element={<CreatePostU />} />
          <Route exact path="/severity/:severity" element={<LevelOfPosts />} />
        </Routes>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="app">
      <Router>
        <NavBar />
        <div className="wrap">{renderElement(isAuth, role)}</div>
      </Router>
    </div>
  );
}

export default App;
