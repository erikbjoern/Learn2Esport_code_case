import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import FlagIcon from "../modules/flagIcon"
import { continentNames } from "../modules/continents"
import { Country } from "../types"
import styles from "../stylesheets/Modal.module.css"

interface Props {
  country: Country
  activeCountry: Country
  setActiveCountry: React.Dispatch<React.SetStateAction<Country | null>>
  rndmCountriesInCont: Country[]
  total: number
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Modal: React.FC<Props> = ({
  country,
  activeCountry,
  setActiveCountry,
  rndmCountriesInCont,
  total,
  setFilter,
}): JSX.Element => {
  const [closing, setClosing] = useState(false)
  const continentName = continentNames[country.continent.code]

  const scrollIfTooSmall = () => {
    window.innerHeight < 700 && window.scrollTo({ top: 100, behavior: "smooth" })
  }

  useEffect(() => {
    window.addEventListener("resize", scrollIfTooSmall)

    return () => window.removeEventListener("resize", scrollIfTooSmall)
  }, [])

  const searchByContinent = () => {
    setClosing(true)

    setTimeout(() => {
      window.scrollTo({ top: 100, behavior: "smooth" })
    }, 200)
    setTimeout(() => {
      setActiveCountry(null)
      setFilter(continentName)
    }, 700)
  }

  const otherCountries = rndmCountriesInCont.map((country: Country) => (
    <CountryCard
      key={country.code}
      country={country}
      activeCountry={activeCountry}
      setActiveCountry={setActiveCountry}
      fromModal={true}
    />
  ))

  return (
    <>
      <div
        className={closing ? styles.fadeOutOverlay : styles.overlay}
        onClick={() => setActiveCountry(null)}
        data-cy="overlay"
      />
      <div className={closing ? styles.closingModal : styles.modal} data-cy="modal">
        <div className={styles.topContainer}>
          <div className={styles.flag} data-cy="modal-flag">
            <FlagIcon code={country.code.toLowerCase()} size={"5x"} />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.heading} data-cy="modal-name">
              {country.name}
            </h3>
            <p className={styles.continent} data-cy="modal-continent">
              {continentName}
            </p>
          </div>
        </div>
        <div className={closing ? styles.closingBtmCont : styles.bottomContainer}>
          <p className={styles.otherCountriesText} data-cy="other-countries">
            Other countries in {continentName}
          </p>
          {otherCountries}
          <p
            className={styles.remainingAmount}
            onClick={searchByContinent}
            data-cy="remaining-amount"
          >
            {!closing && total > 4 && `+ ${total - 4} more`}
          </p>
        </div>
      </div>
    </>
  )
}

export default Modal
