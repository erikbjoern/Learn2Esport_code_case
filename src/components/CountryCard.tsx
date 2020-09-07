import React from "react"
import styles from "../stylesheets/CountryCard.module.css"
import { scrollIntoView } from "../helpers/scrollIntoView"
import { continents } from "../modules/continents"
import FlagIcon from "../modules/flagIcon"

interface Country {
  capital: string;
  code: string;
  continent: {
    code: string;
  };
  currency: string;
  languages: {
    name: {
      name: string[];
    };
  };
  name: string;
};

interface Props {
  country: Country;
  setActiveCountry: React.Dispatch<React.SetStateAction<Country | null>>;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fromModal: boolean;
}

const CountryCard: React.FC<Props> = ({ country, setActiveCountry, modalIsOpen, setModalIsOpen, fromModal }): any => {


  if (!country) return null

  const languagesArr = Object.entries(country.languages).map(([k, v]) => v.name)
  const capital = country.capital
  const continent: string[] = continents[country.continent.code]
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
    setModalIsOpen(true)
    setActiveCountry(country)

    if (!fromModal) {
      scrollIntoView()
    }
  }

  return (
    <div
      className={fromModal ? styles.modalContainer : styles.container}
      onClick={onClickHandler}
      tabIndex={fromModal ? 0 : modalIsOpen ? undefined : 0}
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
