import React, { useState } from "react";

const AddItem = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: false,
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
    onAdd(formData);
    setFormData({ name: "", description: "", status: false }); // Reset form
  };

  return (
    <div
      className="add-item-container"
      style={{
        border: "1px solid #e2e8f0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h3>Add New Item</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Item Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Active Status
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
        >
          Submit New Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
