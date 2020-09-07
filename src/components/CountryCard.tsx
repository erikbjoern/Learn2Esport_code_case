import React from "react"
import styles from "../stylesheets/CountryCard.module.css"
import { scrollIntoView } from "../helpers/scrollIntoView"
import { continentNames } from "../modules/continents"
import FlagIcon from "../modules/flagIcon"
import { Country } from "../types"

interface Props {
  country: Country
  activeCountry: Country | null
  setActiveCountry: React.Dispatch<React.SetStateAction<Country | null>>
  fromModal: boolean
}

const CountryCard: React.FC<Props> = ({
  country,
  activeCountry,
  setActiveCountry,
  fromModal,
}): JSX.Element => {

  const languagesArr = Object.entries(country.languages).map(([k, v]) => v.name)
  const capital = country.capital
  const continent: string[] = continentNames[country.continent.code]
  const languages = languagesArr.join(", ")
  const currency = country.currency?.split(",").join(", ")

  const keyWordsArr = [capital, continent, languages, currency]

  const keyWords = keyWordsArr
    .filter((w) => w != null && w !== "")
    .map((w, i) => {
      return i === 0 ? (
        <span key={i}>{w}</span>
      ) : (
        <span key={i}>
          <span className={styles.bullet}> ● </span>
          <span>{w}</span>
        </span>
      )
    })

  const onEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === 13) openModal()
  }

  const onClickHandler = () => {
    openModal()
  }

  const openModal = () => {
    setActiveCountry(country)

    if (!activeCountry) {
      scrollIntoView()
    }
  }

  return (
    <div
      className={activeCountry ? styles.modalContainer : styles.container}
      onClick={onClickHandler}
      tabIndex={fromModal ? 0 : activeCountry ? undefined : 0}
      onKeyDown={onEnterHandler}
    >
      <div className={styles.flag}>
        <FlagIcon code={country.code.toLowerCase()} size={"3x"} />
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.heading}>{country.name}</h3>
        <p className={styles.keyWords}>{keyWords}</p>
      </div>
    </div>
  )
}

export default CountryCard
