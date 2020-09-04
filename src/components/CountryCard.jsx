import React from "react"
import styles from "../stylesheets/CountryCard.module.css"
import { continents } from "../modules/continents"

const CountryCard = ({ country }) => {
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
        <span>{w}</span>
      ) : (
        <>
          <span className={styles.bullet}> ● </span>
          <span>{w}</span>
        </>
      )
    })

  return (
    <div className={styles.container}>
      <span className={styles.flag}>{country.emoji}</span>
      <div className={styles.textContainer}>
        <h3 className={styles.heading}>{country.name}</h3>
        <p className={styles.keyWords}>{keyWords}</p>
      </div>
    </div>
  )
}

export default CountryCard
