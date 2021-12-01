import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Main from "./Pages/Main";
import Posts from "./Pages/Posts";
import Layout from "./Components/Layout";

const App = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/Posts" element={<Posts />} />
      </Route>
      <Route exact path="/login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
