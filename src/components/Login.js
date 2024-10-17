// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // استيراد الدوال اللازمة من Firebase
import './Login.css'; // استيراد ملف CSS

// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB81wK2yjMcbtGAxd-zZHorL8biJdQEEtE",
    authDomain: "procurement-edecs.firebaseapp.com",
    databaseURL: "https://procurement-edecs-default-rtdb.firebaseio.com",
    projectId: "procurement-edecs",
    storageBucket: "procurement-edecs.appspot.com",
    messagingSenderId: "286460493603",
    appId: "1:286460493603:web:b0cf208790e3824c8dd696",
    measurementId: "G-GC4D2RJW11"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // تسجيل دخول المستخدم
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // تسجيل الدخول بنجاح
                console.log("تسجيل الدخول بنجاح:", userCredential.user);
                navigate('/home'); // توجيه إلى صفحة الهوم
            })
            .catch((error) => {
                // التعامل مع الأخطاء
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("خطأ في تسجيل الدخول:", errorCode, errorMessage);
                alert("فشل تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.");
            });
    };

    return (
        <div className="login-container">
            <h2>تسجيل الدخول</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>البريد الإلكتروني:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>كلمة المرور:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">تسجيل الدخول</button>
            </form>
        </div>
    );
};

export default Login;
