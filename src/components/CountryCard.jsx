import React from "react"
import styles from "../stylesheets/CountryCard.module.css"

const CountryCard = ({ country }) => {
  let languagesArray = []

  country &&
    Object.entries(country.languages).forEach(([k, v]) => {
      languagesArray.push(v.name)
    })

  const capital = country?.capital
  const continent = country?.continent.code
  const languages = languagesArray.join(", ")
  const currency = country?.currency?.split(",").join(", ")

  const keyWordsArr = [capital, continent, languages, currency]
  const keyWords = keyWordsArr.filter((w) => w != null && w !== "").join(" ● ")

  return (
    <div className={styles.container}>
      <span className={styles.flag}>{country?.emoji}</span>
      <div className={styles.textContainer}>
        <h3 className={styles.heading}>
          {country?.name}
        </h3>
        <p className={styles.keyWords}>
          {keyWords}
        </p>
      </div>
    </div>
  )
}

export default CountryCard
