import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import ItemDetails from "./ItemDetails";
import { AppContext } from "../context/AppContext";

const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  // Modal state examples
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAddItem = (data) => {
    setItems((prevItems) => [...prevItems, data]);
    setModalOpen(false);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/${itemId}`,
        { method: "DELETE" },
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Modal handler examples
  const handleOpenNewItem = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const handleOpenViewItem = (itemToView) => {
    setSelectedItem(itemToView);
    setModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        handleDelete: handleDeleteItem,
        state,
        dispatch,
        searchInput,
        setSearchInput,
      }}
    >
      <div className="dashboard">
        <h1>Generic Dashboard Template</h1>

        {/* React Router Nav/Link Example Usage */}
        <nav style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Dashboard Home
          </NavLink>
          <Link to="/items/1">Example Item Details</Link>
        </nav>

        <button
          onClick={handleOpenNewItem}
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          + New Item (Opens Modal)
        </button>

        {/* React Router Example Usage */}
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/items/:id" element={<ItemDetails />} />
        </Routes>

        {/* Conditionally render the Modal overlay */}
        {modalOpen && (
          <div className="modalBackground">
            <div className="modalContainer">
              <h2>{selectedItem ? "Edit Item" : "New Item"} Modal Example</h2>
              <p>This is where your generic ItemModal component would go.</p>
              <button onClick={() => setModalOpen(false)}>Close Modal</button>
              {/*
                <GenericModal
                  item={selectedItem}
                  setModalOpen={setModalOpen}
                  onAddItem={handleAddItem}
                  onUpdateItem={handleUpdateItem}
                  onDeleteItem={handleDeleteItem}
                />
              */}
            </div>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default Dashboard;
