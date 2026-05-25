import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useContext(AppContext);

  const item = items.find((i) => i.id === parseInt(id));

  return (
    <div
      className="item-details"
      style={{ padding: "20px", border: "1px solid #ccc" }}
    >
      <h2>Item Details for ID: {id}</h2>
      {item ? <p>Name: {item.name}</p> : <p>Item not found.</p>}
      <button onClick={() => navigate("/")}>Back to Dashboard</button>
    </div>
  );
};

export default ItemDetails;
