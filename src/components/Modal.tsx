import React, { useEffect } from "react"
import styles from "../stylesheets/Modal.module.css"
import FlagIcon from "../modules/flagIcon"
import { continents } from "../modules/continents"
import CountryCard from "./CountryCard"
import { scrollIntoView } from "../helpers/scrollIntoView"

type Country = {
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
  country: Country | null;
  rndmCountriesInCont: Country[];
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  setActiveCountry: React.Dispatch<React.SetStateAction<Country | null>>;
}

const Modal: React.FC<Props> = ({
  country,
  rndmCountriesInCont,
  isOpen,
  setModalIsOpen,
  total,
  setActiveCountry,
}) => {
  useEffect(() => {
    window.addEventListener("resize", scrollIntoView)

    return () => window.removeEventListener("resize", scrollIntoView)
  }, [])

  if (!isOpen || !country) return null

  const otherCountries = rndmCountriesInCont.map((country: Country) => (
    <CountryCard
      key={country.code}
      country={country}
      setModalIsOpen={setModalIsOpen}
      setActiveCountry={setActiveCountry}
      modalIsOpen={true}
      fromModal={true}
    />
  ))

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalIsOpen(false)} />
      <div className={styles.modal}>
        <div className={styles.topContainer}>
          <div className={styles.flag}>
            <FlagIcon code={country.code.toLowerCase()} size={"5x"} />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.heading}>{country.name}</h3>
            <p className={styles.continent}>{continents[country.continent.code]}</p>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <p className={styles.otherCountriesText}>
            Other countries in {continents[country.continent.code]}
          </p>
          {otherCountries}
          <p className={styles.count}>{total > 4 && `+ ${total - 4} more`}</p>
        </div>
      </div>
    </>
  )
}

export default Modal
