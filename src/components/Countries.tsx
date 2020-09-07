import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import Modal from "./Modal"
import { fetchCountries } from "../modules/fetchCountries"
import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import styles from "../stylesheets/Countries.module.css"

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
  filter: string;
}

const Countries: React.FC<Props> = ({ filter }): JSX.Element => {
  const [countryList, setCountryList] = useState<Country[]>([])
  const [filteredList, setFilteredList] = useState<Country[]>([])
  const [activeCountry, setActiveCountry] = useState<Country | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const rndmCountriesInCont: Country[] = []
  const inSameCont = countryList.filter((c: Country) => c.continent.code === activeCountry?.continent?.code)
  const inSameContTotal: number = inSameCont.length

  for (let i = 0; i < 3; i++) {
    const randomCountry = inSameCont[Math.floor(Math.random() * inSameCont.length)]
    if (!rndmCountriesInCont.find((c) => c === randomCountry) && randomCountry !== activeCountry) {
      rndmCountriesInCont.push(randomCountry)
    } else {
      i-=1
    }
  }

  const fetch = async () => {
    let response: any;
    response = await fetchCountries()
    setCountryList(response.data.countries)
  }

  const escape = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setModalIsOpen(false)
    }
  }

  const countryCards: React.ReactNode[] = filteredList.map((country: Country) => (
    <CountryCard
      key={country.code}
      country={country}
      setActiveCountry={setActiveCountry}
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      fromModal={false}
    />
  ))

  useEffect(() => {
    fetch()
    document.addEventListener("keydown", escape)

    return () => document.removeEventListener("keydown", escape)
  }, [])

  useEffect(() => {
    const filteredAndSorted: Country[] = [
      ...findMatchInBeginning(countryList, filter),
      ...findMatchElsewhere(countryList, filter),
    ]
    setFilteredList(filteredAndSorted)
  }, [filter, countryList])

  return (
    <>
      <Modal
        country={activeCountry}
        setActiveCountry={setActiveCountry}
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        rndmCountriesInCont={rndmCountriesInCont}
        total={inSameContTotal}
      />
      <div>
        <h2 className={styles.heading}>All countries</h2>
        <p className={styles.amount}>
          {filteredList.length} / {countryList.length}
        </p>
        <div className={styles.cardContainer}>{countryCards}</div>
      </div>
    </>
  )
}

export default Countries
