import React from "react"

const CountryCard = ({ country }) => {
  let languagesArray = []

  country &&
    Object.entries(country.languages).forEach(([k, v]) => {
      languagesArray.push(v.name)
    })

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
        <span style={{ fontSize: "50px"}}>{country?.emoji}</span>
        <div
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <h3 style={{ color: "white", font: "18px arial semibold, sans-serif", margin: 0 }}>
            {country?.name}
          </h3>
          <p style={{ color: "#ccc", font: "11px arial, sans-serif", margin: 0 }}>
            {country?.capital} ● {country?.continent.code} ● {languagesArray.join(", ")} ●{" "}
            {country?.currency}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountryCard
