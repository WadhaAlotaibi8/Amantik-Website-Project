import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/FLstyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/lost/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Lost item not found");
        }
        return res.json();
      })
      .then(setItem)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h4>{error}</h4>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Lost Item Details</h2>

      <div className="card shadow-sm">
      {/* IMAGE — show only if a REAL image exists */}
      {item?.image && item.image !== "placeholder.jpg" && (
        <img
          src={`http://localhost:5000${item.image}`}
          className="card-img-top"
          alt="lost item"
          style={{ maxHeight: "380px", objectFit: "cover" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

        <div className="card-body">
          {/* TITLE */}
          <h5 className="card-title text-uppercase fw-bold">
            {item.item || "Lost Item"}
          </h5>

          <p><strong>College:</strong> {item.college || "Not specified"}</p>
          <p><strong>Last Location:</strong> {item.location || "Not specified"}</p>
          <p><strong>Description:</strong> {item.description || "Not specified"}</p>
          <p><strong>Date lost:</strong> {item.date || "Not specified"}</p>
          <p><strong>Contact details:</strong> {item.contact || "Not specified"}</p>

           <div className="mt-4 text-end">
            <button
              className="btn btn-primary px-4"
              onClick={() => navigate("/chat")}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LostPage;
