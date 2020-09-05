import React from "react"
import styles from "../stylesheets/Modal.module.css"
import FlagIcon from "../modules/flagIcon"
import { continents } from "../modules/continents"
import CountryCard from "./CountryCard"

const Modal = ({ country, rndmCountriesInCont, isOpen, setModalIsOpen, total, setActiveCountry }) => {
  debugger

  if (!isOpen) return null

  const otherCountries = rndmCountriesInCont
    .slice(0, 3)
    .map((country) => <CountryCard key={country.code} country={country} setModalIsOpen={setModalIsOpen} setActiveCountry={setActiveCountry} />)

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalIsOpen(false)} />
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.flag}>
            <FlagIcon code={country.code.toLowerCase()} size={"5x"} />
          </div>
          <h3 className={styles.heading}>{country.name}</h3>
          <p className={styles.continent}>{continents[country.continent.code]}</p>
          <p className={styles.otherCountriesText}>
            Other countries in {continents[country.continent.code]}
          </p>
          <div className={styles.cardContainer}>{otherCountries}</div>
          <p>+ {total - 3} more</p>
        </div>
      </div>
    </>
  )
}

export default Modal
