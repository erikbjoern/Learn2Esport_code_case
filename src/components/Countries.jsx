import React from "react"
import CountryCard from "./CountryCard"

const Countries = () => {
  return (
    <div>
      <h2 style={{ color: "white", font: "18px arial semibold", margin: 0 }}>All countries</h2>
      <p style={{ color: "#ccc", font: "9px arial", margin: "0 0 10px 0" }}>8 / 195</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "-10px",
        }}
      >
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
      </div>
    </div>
  )
}

export default Countries
