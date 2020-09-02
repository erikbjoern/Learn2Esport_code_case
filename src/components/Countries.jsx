import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import { fetchCountries } from "../modules/fetchCountries"

const Countries = () => {
  const [countryList, setCountryList] = useState([])

  const fetch = async () => {
    const response = await fetchCountries()
    debugger
    setCountryList(response.data.countries)
  }

  useEffect(() => {
    fetch()
  }, [])

  const countryCards = countryList.map((country) => <CountryCard country={country} />)

  return (
    <div>
      <h2 style={{ color: "white", font: "18px arial semibold, sans-serif", margin: 0 }}>All countries</h2>
      <p style={{ color: "#ccc", font: "9px arial, sans-serif", margin: "0 0 10px 0" }}>
        {countryList.length} / {countryList.length}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "-10px",
        }}
      >
        {countryCards}
      </div>
    </div>
  )
}

export default Countries
