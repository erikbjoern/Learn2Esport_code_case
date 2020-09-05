import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import Modal from "./Modal"
import { fetchCountries } from "../modules/fetchCountries"
import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import styles from "../stylesheets/Countries.module.css"

const Countries = ({ filter }) => {
  const [countryList, setCountryList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [activeCountry, setActiveCountry] = useState({})
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const rndmCountriesInCont = []
  const inSameCont = countryList.filter((c) => c.continent.code === activeCountry?.continent?.code)
  const inSameContTotal = inSameCont.length

  for (let i = 0; i < 10; i++) {
    const randomCountry = inSameCont[Math.floor(Math.random() * inSameCont.length)]
    if (!rndmCountriesInCont.find((c) => c === randomCountry)) {
      rndmCountriesInCont.push(randomCountry)
    }
  }

  const fetch = async () => {
    const response = await fetchCountries()
    setCountryList(response.data.countries)
  }

  const countryCards = filteredList.map((country) => (
    <CountryCard
      key={country.code}
      country={country}
      setActiveCountry={setActiveCountry}
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
    />
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
    <>
      <Modal
        country={activeCountry}
        setActiveCountry={setActiveCountry}
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        rndmCountriesInCont={rndmCountriesInCont}
        total={inSameContTotal}
      />
      <div>
        <h2 className={styles.heading}>All countries</h2>
        <p className={styles.amount}>
          {filteredList.length} / {countryList.length}
        </p>
        <div className={styles.cardContainer}>{countryCards}</div>
      </div>
    </>
  )
}

export default Countries
