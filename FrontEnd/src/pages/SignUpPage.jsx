import React, { useState } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // 🔐 Password strength helper
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "weak";
    if (score <= 3) return "medium";
    return "strong";
  };

  const strength = getPasswordStrength(password);

  async function handleSignup() {
    if (!username || !email || !college || !password)
      return alert("Please fill all fields");

    if (password !== confirm)
      return alert("Passwords do not match");

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, college }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || "Signup failed");

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("college", data.user.college);

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        {/* USERNAME */}
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* COLLEGE */}
        <label>College</label>
        <select
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        >
          <option value="">Select a college</option>
          <option>College of Science</option>
          <option>College of Engineering & Petroleum</option>
          <option>College of Law</option>
          <option>College of Sharia</option>
          <option>College of Social Science</option>
          <option>College of Business Administration</option>
          <option>College of Art</option>
          <option>College of Education</option>
          <option>Other</option>
        </select>

        {/* EMAIL */}
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* PASSWORD STRENGTH */}
        {password && (
          <div className={`password-strength ${strength}`}>
            <div className="strength-bar"></div>
            <span>
              {strength === "weak" && "Weak password"}
              {strength === "medium" && "Medium password"}
              {strength === "strong" && "Strong password 💪"}
            </span>
          </div>
        )}

        {/* CONFIRM */}
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* SUBMIT */}
        <button className="btn-primary" onClick={handleSignup}>
          Sign Up
        </button>

        <div className="signup-links">
          <span onClick={() => navigate("/login")}>
            Already have an account?
          </span>
        </div>

      </div>
    </div>
  );
}

export default SignUpPage;
