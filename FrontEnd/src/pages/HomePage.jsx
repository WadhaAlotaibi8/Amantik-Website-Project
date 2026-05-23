import React, { useState } from "react";
import "../styles/home_style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import kuLogo from "../assets/kulogo.png";
import amantikLogo from "../assets/Amantiklogo.png";


import { useNavigate } from "react-router-dom";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const icons = {
    science: "🧪",
    engineering: "⚙️",
    law: "👩🏻‍⚖️",
    sharia: "📜",
    art: "🎨",
    social: "🧠",
    business: "💼",
    education: "📚",
  };

  return (
    <div className="home-page">
      {/* HEADER */}
      <header className="home-header">
        <img src={kuLogo} alt="KU Logo" className="ku-logo" />
        
        <h3>Kuwait University Lost & Found Platform</h3>

        <nav className="nav-container">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <button className="nav-btn" onClick={() => navigate("/user")}>
              My Profile
            </button>
          </div>
        </nav>
      </header>

      {/* MAIN SECTION */}
      <section>
        <h1 className="main-title">Welcome to Amantik</h1>

        <div className="report-container">
          <div className="report-card">
            <h3>All Lost Reports</h3>
            <button className="view-btn" onClick={() => navigate("/lost")}>
              View
            </button>
          </div>

          <div className="report-card">
            <h3>All Found Reports</h3>
            <button className="view-btn" onClick={() => navigate("/found")}>
              View
            </button>
          </div>
        </div>
      </section>

      {/* POST BUTTONS SECTION */}
      <div className="post-section">
        <button className="post-btn" onClick={() => navigate("/lost-item")}>
          + Post Lost Item
        </button>

        <button className="post-btn" onClick={() => navigate("/found-item")}>
          + Post Found Item
        </button>
      </div>

      {/* COLLEGE SECTION */}
      <section>
        <h3>Colleges at Kuwait University</h3>

        <div className="colleges">
          <div className="college-card clickable">
            <div className="emoji">{icons.science}</div>
            College of Science
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", { state: { college: "College of Science" } })
              }
            >
              View Reports
            </button>
          </div>

          <div className="college-card clickable">
            <div className="emoji">{icons.engineering}</div>
            College of Engineering & Petroleum
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", {
                  state: { college: "College of Engineering & Petroleum" },
                })
              }
            >
              View Reports
            </button>
          </div>

          <div className="college-card clickable">
            <div className="emoji">{icons.law}</div>
            College of Law
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", { state: { college: "College of Law" } })
              }
            >
              View Reports
            </button>
          </div>

          <div className="college-card clickable">
            <div className="emoji">{icons.sharia}</div>
            College of Sharia
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", { state: { college: "College of Sharia" } })
              }
            >
              View Reports
            </button>
          </div>

          <div className="college-card clickable">
            <div className="emoji">{icons.social}</div>
            College of Social Science
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", {
                  state: { college: "College of Social Science" },
                })
              }
            >
              View Reports
            </button>
          </div>

          <div className="college-card clickable">
            <div className="emoji">{icons.business}</div>
            College of Business Administration
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", {
                  state: { college: "College of Business Administration" },
                })
              }
            >
              View Reports
            </button>
          </div>

          <div className="college-card clickable">
            <div className="emoji">{icons.art}</div>
            College of Art
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", { state: { college: "College of Art" } })
              }
            >
              View Reports
            </button>
          </div>

          <div className="college-card clickable">
            <div className="emoji">{icons.education}</div>
            College of Education
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/reports", { state: { college: "College of Education" } })
              }
            >
              View Reports
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-box">
          <h3>Contact Security & Safety</h3>
          <p>For urgent inquiries, please contact University Security</p>

          <div className="security-number">
            📞 Kuwait University Security: <strong>+965 2498 3333</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
