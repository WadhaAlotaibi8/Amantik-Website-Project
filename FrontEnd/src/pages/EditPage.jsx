import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function EditPage() {
  const navigate = useNavigate();

  // Load saved data
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") || ""
  );
  const [college, setCollege] = useState(
    localStorage.getItem("college") || ""
  );

  const saveChanges = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("college", college);

    navigate("/user");
  };

  const resetPassword = () => {
    // simple + realistic flow
    navigate("/login"); 
    alert("Please use the 'Forgot Password' option to reset your password.");
  };

  return (
    <div className="user-page">
      {/* HEADER */}
      <header className="user-topbar">
        <h2 className="logo">Amantik</h2>
       <div className="college-nav">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/user")}>My Profile</button>
        </div>
      </header>

      {/* CARD */}
      <div className="profile-wrapper">
        <div className="profile-card">

          <h2>Edit Profile</h2>

          {/* USERNAME */}
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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

          {/* ACTIONS */}
          <div className="modal-actions">
            <button className="primary-btn" onClick={saveChanges}>
              Save Changes
            </button>
            <button className="outline-btn" onClick={() => navigate("/user")}>
              Cancel
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default EditPage;
