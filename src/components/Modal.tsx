import React, { useEffect } from "react"
import styles from "../stylesheets/Modal.module.css"
import FlagIcon from "../modules/flagIcon"
import { continentNames } from "../modules/continents"
import CountryCard from "./CountryCard"
import { scrollIntoView } from "../helpers/scrollIntoView"
import { Country } from "../types"

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
  setFilter
}): JSX.Element => {
  const continentName = continentNames[country.continent.code]

  useEffect(() => {
    window.addEventListener("resize", scrollIntoView)

    return () => window.removeEventListener("resize", scrollIntoView)
  }, [])

  const searchByContinent = () => {
    setActiveCountry(null)
    setFilter(continentName)
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
      <div className={styles.overlay} onClick={() => setActiveCountry(null)} />
      <div className={styles.modal}>
        <div className={styles.topContainer}>
          <div className={styles.flag}>
            <FlagIcon code={country.code.toLowerCase()} size={"5x"} />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.heading}>{country.name}</h3>
            <p className={styles.continent}>{continentName}</p>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <p className={styles.otherCountriesText}>
            Other countries in {continentName}
          </p>
          {otherCountries}
          <p className={styles.count} onClick={searchByContinent}>
            {total > 4 && `+ ${total - 4} more`}
          </p>
        </div>
      </div>
    </>
  )
}

export default Modal
