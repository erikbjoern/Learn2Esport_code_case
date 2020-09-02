import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import { fetchCountries } from "../modules/fetchCountries"
import { findMatchInBeginning, findMatchElsewhere } from '../helpers/sortResult'

const Countries = ({ filter }) => {
  const [countryList, setCountryList] = useState([])
  const [filteredList, setFilteredList] = useState([])

  const fetch = async () => {
    const response = await fetchCountries()
    setCountryList(response.data.countries)
  }

  const countryCards = filteredList.map((country) => (
    <CountryCard key={country.name} country={country} />
  ))

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    const filteredAndSorted = [
      ...findMatchInBeginning(countryList, filter),
      ...findMatchElsewhere(countryList, filter)
    ]
    setFilteredList(filteredAndSorted)
  }, [filter, countryList])

  return (
    <div>
      <h2 style={{ color: "white", font: "18px arial semibold, sans-serif", margin: 0 }}>
        All countries
      </h2>
      <p style={{ color: "#ccc", font: "9px arial, sans-serif", margin: "0 0 10px 0" }}>
        {filteredList.length} / {countryList.length}
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
