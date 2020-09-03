import React from "react"
import styles from "../stylesheets/CountryCard.module.css"

const CountryCard = ({ country }) => {
  let languagesArray = []

  country &&
    Object.entries(country.languages).forEach(([k, v]) => {
      languagesArray.push(v.name)
    })

  return (
    <div className={styles.container}>
      <span className={styles.flag}>{country?.emoji}</span>
      <div className={styles.textContainer}>
        <h3 className={styles.heading}>{country?.name}</h3>
        <p className={styles.keyWords}>
          {country?.capital} ● {country?.continent.code} ● {languagesArray.join(", ")} ●{" "}
          {country?.currency}
        </p>
      </div>
    </div>
  )
}

export default CountryCard
