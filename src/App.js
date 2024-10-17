// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import VendorDetail from './components/VendorDetail';
import Login from './components/Login'; // استيراد مكون Login
import Navbar from './components/Navbar'; // استيراد Navbar
import { LoadingProvider } from './LoadingContext'; // استيراد LoadingProvider
import Loading from './components/Loading'; // استيراد مكون التحميل

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Navbar /> {/* إضافة Navbar */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* تعيين صفحة تسجيل الدخول كصفحة رئيسية */}
          <Route path="/home" element={<Home />} /> {/* تغيير مسار صفحة الهوم */}
          <Route path="/vendor/:id" element={<VendorDetail />} />
        </Routes>
        <Loading /> {/* عرض مكون التحميل */}
      </Router>
    </LoadingProvider>
  );
}

export default App;
