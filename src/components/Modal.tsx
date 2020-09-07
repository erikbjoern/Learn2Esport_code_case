import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import FlagIcon from "../modules/flagIcon"
import { scrollIntoView } from "../helpers/scrollIntoView"
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
  const scrollIfTooSmall: any = scrollIntoView("small viewport")

  useEffect(() => {
    window.addEventListener("resize", scrollIfTooSmall)

    return () => window.removeEventListener("resize", scrollIfTooSmall)
  }, [scrollIfTooSmall])


  const searchByContinent = () => {
    setClosing(true)

    
    setTimeout(() => {   
      scrollIntoView("search by continent")
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
      />
      <div className={closing ? styles.closingModal : styles.modal}>
        <div className={styles.topContainer}>
          <div className={styles.flag}>
            <FlagIcon code={country.code.toLowerCase()} size={"5x"} />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.heading}>{country.name}</h3>
            <p className={styles.continent}>{continentName}</p>
          </div>
        </div>
        <div className={closing ? styles.closingBtmCont : styles.bottomContainer}>
          <p className={styles.otherCountriesText}>Other countries in {continentName}</p>
          {otherCountries}
          <p className={styles.count} onClick={searchByContinent}>
            {!closing && total > 4 && `+ ${total - 4} more`}
          </p>
        </div>
      </div>
    </>
  )
}

export default Modal
