import "./App.css";


import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import CreatePost from "./CreatePost";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/post" element={<CreatePost/>} />
        <Route path="/SignUp" element={<SignUp/>} />



      </Routes>

      {/* <Test/>  */}
    </div>
  );
}

export default App;


