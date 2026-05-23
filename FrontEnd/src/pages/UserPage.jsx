import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function UserPage() {
  const navigate = useNavigate();

  // 🔹 Load user data from localStorage
  const [username, setUsername] = useState("User");
  const [college, setCollege] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "User");
    setCollege(localStorage.getItem("college") || "");
    setAvatar(localStorage.getItem("avatar"));
  }, []);

  // 🔹 Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("avatar", reader.result);
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="user-page">
      {/* HEADER */}
      <header className="user-topbar">
        <h2 className="logo">Amantik</h2>
        <button className="home-btn" onClick={() => navigate("/home")}>
          Home
        </button>
      </header>

      {/* PROFILE CARD */}
      <div className="profile-wrapper">
        <div className="profile-card">

          {/* AVATAR */}
          <div className="avatar-wrapper">
            {avatar ? (
              <img src={avatar} alt="avatar" className="avatar-img" />
            ) : (
              <div className="profile-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
            )}

            <label className="avatar-edit">
              🖼 Change
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          {/* USER INFO */}
          <h2 className="profile-name">{username}</h2>
          <p className="profile-college">{college}</p>

          {/* EDIT PROFILE */}
          <button
            className="edit-profile-btn"
            onClick={() => navigate("/edit-profile")}
          >
            ✏️ Edit Profile
          </button>

          {/* STATS */}
          <div className="profile-stats">
            <div className="stat-box">
              <strong>0</strong>
              <span>Total</span>
            </div>
            <div className="stat-box">
              <strong>0</strong>
              <span>Lost</span>
            </div>
            <div className="stat-box">
              <strong>0</strong>
              <span>Found</span>
            </div>
          </div>

          <p className="empty-text">
            You haven’t submitted any reports yet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
