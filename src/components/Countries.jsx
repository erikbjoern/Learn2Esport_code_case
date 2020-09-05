import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import { fetchCountries } from "../modules/fetchCountries"
import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import styles from "../stylesheets/Countries.module.css"

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
      ...findMatchElsewhere(countryList, filter),
    ]
    setFilteredList(filteredAndSorted)
  }, [filter, countryList])

  return (
    <div>
      <h2 className={styles.heading}>All countries</h2>
      <p className={styles.amount}>
        {filteredList.length} / {countryList.length}
      </p>
      <div className={styles.cardContainer}>{countryCards}</div>
    </div>
  )
}

export default Countries
