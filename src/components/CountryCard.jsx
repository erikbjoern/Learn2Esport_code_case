import React from "react"
import sweden from "../images/sweden.png"

const CountryCard = () => {
  return (
    <div
      style={{
        backgroundColor: "#394259",
        borderRadius: "3px",
        boxShadow: "1px 1px 5px #252522",
        flex: "1 1 40%",
        padding: "20px",
        margin: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img src={sweden} height="65px" alt="flag icon" />
        <div
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <h3 style={{ color: "white", font: "18px arial semibold", margin: 0 }}>Sweden</h3>
          <p style={{ color: "#ccc", font: "11px arial", margin: 0 }}>
            Stockholm ● Europe ● Swedish ● SEK
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountryCard
