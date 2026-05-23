import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/FLstyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function FoundPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BACKEND = "http://localhost:5000";

  const imgUrl = (img) => {
    if (!img) return "/placeholder.jpg"; // put placeholder.jpg in /public
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return BACKEND + img; // ✅ /uploads/...
    return BACKEND + "/" + img;
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${BACKEND}/api/found/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Found item not found.");
        }
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>{error}</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Found Item Details</h2>

      <div className="card shadow-sm">
      {/* IMAGE — show ONLY if real image exists */}
      {item?.image && item.image !== "placeholder.jpg" && (
        <img
          src={imgUrl(item.image)}
          className="card-img-top"
          alt={item.item || "Found Item"}
          style={{ maxHeight: "380px", objectFit: "cover" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

        <div className="card-body">
          <h5 className="card-title text-uppercase fw-bold">
            {item?.item || "Found Item"}
          </h5>

          <p><strong>College:</strong> {item.college || "Not specified"}</p>
          <p><strong>Description:</strong> {item.description || "Not specified"}</p>
          <p><strong>Date lost:</strong> {item.date || "Not specified"}</p>
          <p><strong>Contact details:</strong> {item.contact || "Not specified"}</p>
       
          <div className="mt-3 text-end">
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

export default FoundPage;
