import React from "react"
import styles from "../stylesheets/Modal.module.css"
import FlagIcon from "../modules/flagIcon"
import { continents } from "../modules/continents"
import CountryCard from "./CountryCard"

const Modal = ({
  country,
  rndmCountriesInCont,
  isOpen,
  setModalIsOpen,
  total,
  setActiveCountry,
}) => {
  if (!isOpen) return null

  const otherCountries = rndmCountriesInCont
    .map((country) => (
      <CountryCard
        key={country.code}
        country={country}
        setModalIsOpen={setModalIsOpen}
        setActiveCountry={setActiveCountry}
        fromModal={true}
      />
    ))

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalIsOpen(false)} />
      <div className={styles.modal}>
        <div className={styles.topContainer}>
          <div className={styles.flag}>
            <FlagIcon code={country.code.toLowerCase()} size={"5x"} />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.heading}>{country.name}</h3>
            <p className={styles.continent}>{continents[country.continent.code]}</p>
          </div>
        </div>
        <p className={styles.otherCountriesText}>
          Other countries in {continents[country.continent.code]}
        </p>
        <div className={styles.cardContainer}>{otherCountries}</div>
        <p>{total > 4 && `+ ${total - 4} more`}</p>
      </div>
    </>
  )
}

export default Modal
