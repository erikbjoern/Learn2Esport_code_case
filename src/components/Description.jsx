import React from "react"

const Description = () => {
  return (
    <div
      style={{
        backgroundColor: "#394259",
        borderRadius: "3px",
        boxShadow: "1px 1px 5px #252522",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "200px",
        marginBottom: "15px",
        justifyContent: "center",
      }}
    >
      <div style={{ marginLeft: "50px" }}>
        <h1
          style={{
            fontFamily: "arial semibold, sans-serif",
          }}
        >
          Lorem Ipsum
        </h1>
        <p
          style={{
            fontFamily: "arial, sans-serif",
          }}
        >
          Sit dolor
        </p>
      </div>
    </div>
  )
}

export default Description
