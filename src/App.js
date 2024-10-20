import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import VendorDetail from "./components/VendorDetail";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { LoadingProvider } from "./LoadingContext";
import Loading from "./components/Loading";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // حالة تسجيل الدخول

  return (
    <LoadingProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />{" "}
        {/* تمرير حالة تسجيل الدخول إلى Navbar */}
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />{" "}
          {/* تمرير دالة تحديث حالة تسجيل الدخول إلى Login */}
          <Route path="/home" element={<Home />} />
          <Route path="/vendor/:id" element={<VendorDetail />} />
        </Routes>
        <Loading />
      </Router>
    </LoadingProvider>
  );
}

export default App;
