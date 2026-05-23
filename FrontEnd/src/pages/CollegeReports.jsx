import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/collegeReports.css";

function CollegeReports() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const college = state?.college;

  const [lost, setLost] = useState([]);
  const [found, setFound] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const BACKEND = "http://localhost:5000";

  const imgUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return BACKEND + img;
    return BACKEND + "/" + img;
  };

  useEffect(() => {
    if (!college) return;

    Promise.all([
      fetch(`${BACKEND}/api/lost`).then((r) => r.json()),
      fetch(`${BACKEND}/api/found`).then((r) => r.json()),
    ])
      .then(([lostData, foundData]) => {
        setLost(
          (lostData || [])
            .filter((i) => i.college === college)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );

        setFound(
          (foundData || [])
            .filter((i) => i.college === college)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      })
      .catch((err) => console.error("Error fetching reports:", err));
  }, [college]);

  const daysAgo = (date) => {
    if (!date) return "Unknown date";
    const diff = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  const filterItems = (items) =>
    (items || []).filter((item) => {
      const keywordMatch = (item.description || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const dateMatch = dateFilter
        ? String(item.date).slice(0, 10) === dateFilter
        : true;

      return keywordMatch && dateMatch;
    });

  const renderCard = (item, type) => {
    const hasImage = item.image && item.image !== "placeholder.jpg";

    return (
      <div
        key={item._id}
        className={`found-card ${!hasImage ? "no-image" : ""}`}
        onClick={() => navigate(`/${type}/${item._id}`)}
      >
        {hasImage && (
          <img
            src={imgUrl(item.image)}
            alt={type}
            className="card-image"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}

        <h4>{item.description || "Not specified"}</h4>

        <span className="report-date">📅 {daysAgo(item.date)}</span>
      </div>
    );
  };

  const filteredLost = filterItems(lost);
  const filteredFound = filterItems(found);

  return (
    <div className="found-container">
      <header className="college-header">
        <h2 className="college-title">{college || "College"} – Reports</h2>
        <div className="college-nav">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/user")}>My Profile</button>
        </div>
      </header>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 Search by keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="form-control"
        />
      </div>

      {/* LOST */}
      <h3 className="section-title">Lost Reports</h3>
      <div className="found-grid">
        {filteredLost.length === 0 ? (
          <p className="empty-message">No lost reports 🕵️‍♀️</p>
        ) : (
          filteredLost.map((item) => renderCard(item, "lost"))
        )}
      </div>

      {/* FOUND */}
      <h3 className="section-title">Found Reports</h3>
      <div className="found-grid">
        {filteredFound.length === 0 ? (
          <p className="empty-message">No found reports 🔍</p>
        ) : (
          filteredFound.map((item) => renderCard(item, "found"))
        )}
      </div>
    </div>
  );
}

export default CollegeReports;
