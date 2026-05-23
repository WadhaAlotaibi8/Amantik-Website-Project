import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemLost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    date: "",
    description: "",
    contact: "",
    college: "",
    otherCollege: "",
    image: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to submit a lost item.");
      navigate("/login");
      return;
    }

    const finalCollege =
      formData.college === "Other"
        ? formData.otherCollege
        : formData.college;

    try {
      const fd = new FormData();
      fd.append("item", "Lost Item");
      fd.append("location", formData.location);
      fd.append("date", formData.date);
      fd.append("description", formData.description);
      fd.append("contact", formData.contact);
      fd.append("college", finalCollege);
      fd.append("category", "General");
      fd.append("status", "Lost");
      fd.append("postedBy", userId);

      if (formData.image) {
        fd.append("image", formData.image);
      }

      await fetch("http://localhost:5000/api/lost", {
        method: "POST",
        body: fd, // ✅ FormData ONLY
      });

      navigate("/lostreports");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting the report.");
    }
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Submit Lost Item</h2>

      <div className="card shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* COLLEGE */}
            <div className="mb-3">
              <label className="form-label">
                College / campus where the item was lost
              </label>
              <select
                className="form-select"
                name="college"
                required
                onChange={handleChange}
              >
                <option value="">Select a college</option>
                <option value="College of Science">College of Science</option>
                <option value="College of Engineering & Petroleum">
                  College of Engineering & Petroleum
                </option>
                <option value="College of Law">College of Law</option>
                <option value="College of Sharia">College of Sharia</option>
                <option value="College of Social Science">
                  College of Social Science
                </option>
                <option value="College of Business Administration">
                  College of Business Administration
                </option>
                <option value="College of Art">College of Art</option>
                <option value="College of Education">College of Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.college === "Other" && (
              <div className="mb-3">
                <label className="form-label">Specify location</label>
                <input
                  type="text"
                  className="form-control"
                  name="otherCollege"
                  placeholder="Enter campus or location name"
                  required
                  onChange={handleChange}
                />
              </div>
            )}

            {/* DATE */}
            <div className="mb-3">
              <label className="form-label">Date lost</label>
              <input
                type="date"
                className="form-control"
                name="date"
                required
                onChange={handleChange}
              />
            </div>

            {/* LOCATION */}
            <div className="mb-3">
              <label className="form-label">
                Last known location inside the campus
              </label>
              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Library, hallway, classroom, cafeteria, etc."
                required
                onChange={handleChange}
              />
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label">Upload Image (optional)</label>
              <input
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="form-label">Item description</label>
              <textarea
                className="form-control"
                rows="4"
                name="description"
                placeholder="Describe the item (type, color, brand, unique details)"
                required
                onChange={handleChange}
              />
            </div>

            {/* CONTACT */}
            <div className="mb-4">
              <label className="form-label">
                How can someone contact you?
              </label>
              <textarea
                className="form-control"
                rows="4"
                name="contact"
                placeholder="Phone number, Instagram, WhatsApp, etc."
                onChange={handleChange}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemLost;