import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/foundReports.css";


function FoundReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const BACKEND = "http://localhost:5000";

  const imgUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return BACKEND + img;
    return BACKEND + "/" + img;
  };

  // 🔹 Fetch FOUND reports
  useEffect(() => {
    fetch(`${BACKEND}/api/found`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) -
            new Date(a.createdAt || a.date)
        );
        setReports(sorted);
      })
      .catch((err) => console.error("Error fetching found items:", err));
  }, []);

  // 🔹 Days ago
  const daysAgo = (date) => {
    if (!date) return "Unknown date";
    const diff = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  // 🔹 Filters
  const filteredReports = reports.filter((item) => {
    const keywordMatch =
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.college?.toLowerCase().includes(search.toLowerCase());

    const dateMatch = dateFilter
      ? String(item.date).slice(0, 10) === dateFilter
      : true;

    return keywordMatch && dateMatch;
  });

  return (
    <div className="found-container">
      <header className="college-header">
        <h2 className="college-title">Amantik – Found Reports</h2>
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

      <h3 className="section-title">All Found Reports</h3>

      <div className="found-grid">
        {filteredReports.length === 0 ? (
          <p className="empty-message">No found reports found 🔍</p>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report._id}
              className={`found-card ${
                !report.image || report.image === "placeholder.jpg"
                  ? "no-image"
                  : ""
              }`}
              onClick={() => navigate(`/found/${report._id}`)}
            >
              {report.image && report.image !== "placeholder.jpg" && (
                <img
                  src={imgUrl(report.image)}
                  alt="found"
                  className="card-image"
                  onError={(e) =>
                    (e.currentTarget.style.display = "none")
                  }
                />
              )}

              <h4>{report.description || "Not specified"}</h4>

              <span className="report-date">
                📅 {daysAgo(report.date)}
              </span>
              <br />
              <span className="report-location">
                📍 {report.college || "Campus area"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoundReports;
