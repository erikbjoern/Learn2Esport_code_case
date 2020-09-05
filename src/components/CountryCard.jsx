import React from "react"
import styles from "../stylesheets/CountryCard.module.css"
import { continents } from "../modules/continents"
import FlagIcon from "../modules/flagIcon"

const CountryCard = ({ country, setActiveCountry, modalIsOpen, setModalIsOpen, fromModal }) => {
  if (!country) return

  const languagesArr = Object.entries(country.languages).map(([k, v]) => v.name)
  const capital = country.capital
  const continent = continents[country.continent.code]
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

  const onClickHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return null

    setModalIsOpen(true)
    setActiveCountry(country)

    if (!fromModal && window.innerHeight < 600) {
      window.scrollTo({ top: 100, behavior: "smooth" })
    }
  }

  return (
    <div
      className={fromModal ? styles.modalContainer : styles.container}
      onClick={onClickHandler}
      tabIndex={fromModal ? 0 : modalIsOpen ? "" : 0}
      onKeyDown={onClickHandler}
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
