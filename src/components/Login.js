import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

const firebaseConfig = {
  apiKey: "AIzaSyB81wK2yjMcbtGAxd-zZHorL8biJdQEEtE",
  authDomain: "procurement-edecs.firebaseapp.com",
  databaseURL: "https://procurement-edecs-default-rtdb.firebaseio.com",
  projectId: "procurement-edecs",
  storageBucket: "procurement-edecs.appspot.com",
  messagingSenderId: "286460493603",
  appId: "1:286460493603:web:b0cf208790e3824c8dd696",
  measurementId: "G-GC4D2RJW11",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("تسجيل الدخول بنجاح:", userCredential.user);
        setIsLoggedIn(true); // تحديث حالة تسجيل الدخول
        navigate("/home");
      })
      .catch((error) => {
        console.error("خطأ في تسجيل الدخول:", error.code, error.message);
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
