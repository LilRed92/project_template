import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DashboardContent = () => {
  const { items, handleDelete, state, dispatch, searchInput, setSearchInput } =
    useContext(AppContext);

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <>
      <div className="reducer-example">
        <p>Reducer Count: {state.count}</p>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      </div>

      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="items-list">
        {filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul>
            {filteredItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                <Link to={`/items/${item.id}`} style={{ marginRight: "15px" }}>
                  {item.name || `Generic Item ${item.id}`}
                </Link>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DashboardContent;
