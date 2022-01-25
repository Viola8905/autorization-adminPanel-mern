
import React from 'react';
import Navbar from './navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from './registration/Registration';
import Login from './login/Login';
import { useDispatch, useSelector } from 'react-redux';
import Test from './Test';
import { useEffect } from 'react';




function App() {
	const isAuth = useSelector(state => state.user.isAuth);
	

	
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="wrap">
          {!isAuth ? 
            <Routes>
              <Route exact path="/registration" element={<Registration />} /> //
              Ctrl + click on "Main" to reach a code of this page
              <Route exact path="/login" element={<Login />} />
             
            </Routes>
           : 
						
            <Routes>
              <Route exact path="/login" element={<Test />} /> // Ctrl + click on
              "Main" to reach a code of this page
           
            </Routes>
          }
        </div>
      </Router>
    </div>
  );
}

export default App;
