import React from "react"

const SearchField = () => {
  return (
    <div
      style={{
        backgroundColor: "#394259",
        borderRadius: "3px",
        display: "flex",
        marginBottom: "15px",
        padding: "15px 25px",
      }}
    >
      <div
        style={{
          alignItems: "center",
          borderRadius: "22px",
          backgroundColor: "#677491",
          color: "#fff",
          display: "flex",
          width: "100%",
        }}
      >
        <i class="fas fa-search" style={{ fontSize: "11px", margin: "3px 3px 3px 20px" }}></i>
        <input
          type="text"
          placeholder="Search for a country"
          style={{
            backgroundColor: "transparent",
            border: "none",
            borderColor: "transparent",
            padding: "10px",
            width: "100%",
          }}
        />
      </div>
    </div>
  )
}

export default SearchField
