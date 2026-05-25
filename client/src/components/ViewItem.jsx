import React from "react";

const ViewItem = ({ item, onEdit, onDelete }) => {
  if (!item) return <div className="view-item">No item selected.</div>;

  return (
    <div
      className="view-item-container"
      style={{
        border: "1px solid #e2e8f0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h3>{item.name || "Generic Item"}</h3>

      <div style={{ margin: "15px 0" }}>
        <p>
          <strong>ID:</strong> {item.id}
        </p>
        <p>
          <strong>Description:</strong> {item.description}
        </p>
        <p>
          <strong>Status:</strong> {item.status ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="action-buttons" style={{ display: "flex", gap: "10px" }}>
        {onEdit && (
          <button
            onClick={() => onEdit(item)}
            className="btn btn-primary editBtn"
          >
            Edit Item
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            style={{
              backgroundColor: "#e20000",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewItem;
