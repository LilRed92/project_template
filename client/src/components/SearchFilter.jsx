import React from "react";

export const SearchFilter = ({
  searchInput,
  setSearchInput,
  showActive,
  setShowActive,
}) => {
  return (
    <div
      className="search-filter"
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "15px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search items..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          flex: 1,
        }}
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show Active Only
      </label>
    </div>
  );
};

export default SearchFilter;
