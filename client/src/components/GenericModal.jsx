import React, { useState } from "react";

const GenericModal = ({
  item,
  setModalOpen,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}) => {
  const [formData, setFormData] = useState({
    name: item ? item.name : "",
    description: item ? item.description : "",
    status: item ? item.status : false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      onUpdateItem({ ...item, ...formData });
    } else {
      onAddItem({ id: Date.now(), ...formData });
    }
  };

  return (
    <div
      className="generic-modal"
      style={{ marginTop: "15px", textAlign: "left" }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Item Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
            required
          />
        </div>

        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label>Status (Active):</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
        </div>

        <div
          className="form-buttons"
          style={{ display: "flex", gap: "10px", marginTop: "20px" }}
        >
          <button type="submit" className="btn btn-primary">
            {item ? "Update Item" : "Create Item"}
          </button>
          {item && onDeleteItem && (
            <button
              type="button"
              onClick={() => {
                onDeleteItem(item.id);
                setModalOpen(false);
              }}
              style={{
                backgroundColor: "#e20000",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenericModal;
