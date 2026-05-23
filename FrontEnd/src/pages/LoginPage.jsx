import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const userId = localStorage.getItem("userId");

async function handleLogin() {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }) // ✅ email, NOT username
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    // CLEAR OLD SESSION
    localStorage.clear();

    localStorage.setItem("userId", data.user._id);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("college", data.user.college);

    // GO TO HOME (as you requested)
    navigate("/home");

  } catch (err) {
    console.error(err);
  }
}



  function handleGuest() {
    localStorage.clear();
    navigate("/home");
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary" onClick={handleLogin}>
          Login
        </button>

        <div className="login-links">
          <p onClick={() => navigate("/signup")}>
            Create an Account
          </p>

          <p onClick={handleGuest}>
            Continue as Guest
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
