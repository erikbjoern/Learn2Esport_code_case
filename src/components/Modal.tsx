import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import FlagIcon from "../modules/flagIcon"
import { continentNames } from "../modules/continents"
import { Country } from "../types"
import styles from "../stylesheets/Modal.module.css"

interface Props {
  activeCountry: Country
  setActiveCountry: React.Dispatch<React.SetStateAction<Country | null>>
  countryList: Country[]
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Modal: React.FC<Props> = ({
  activeCountry,
  setActiveCountry,
  countryList,
  setFilter,
}): JSX.Element => {
  const [closing, setClosing] = useState(false)
  const continentName = continentNames[activeCountry.continent.code]
  const inSameContinent: Country[] = countryList
    ? countryList.filter((c: Country) => c.continent.code === activeCountry?.continent?.code)
    : []
  const randomCountriesInContinent: Country[] = []
  const inSameContinentTotal: number = inSameContinent.length

  const scrollIfTooSmall = () => {
    window.innerHeight < 700 && window.scrollTo({ top: 100, behavior: "smooth" })
  }

  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setActiveCountry(null)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", scrollIfTooSmall)
    document.addEventListener("keydown", closeOnEscape)
    
    return () => {
      window.removeEventListener("resize", scrollIfTooSmall)
      document.removeEventListener("keydown", closeOnEscape)
    }
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
  
  for (let i = 0; i < 3; i++) {
    const randomCountry = inSameContinent[Math.floor(Math.random() * inSameContinent.length)]
    if (!randomCountriesInContinent.find((c) => c === randomCountry) && randomCountry !== activeCountry) {
      randomCountriesInContinent.push(randomCountry)
    } else {
      i -= 1
    }
  }

  const otherCountries = randomCountriesInContinent.map((country: Country) => (
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
            <FlagIcon code={activeCountry.code.toLowerCase()} size={"5x"} />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.heading} data-cy="modal-name">
              {activeCountry.name}
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
            {!closing && inSameContinentTotal > 4 && `+ ${inSameContinentTotal - 4} more`}
          </p>
        </div>
      </div>
    </>
  )
}

export default Modal
