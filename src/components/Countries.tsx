import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import Modal from "./Modal"
import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import styles from "../stylesheets/Countries.module.css"
import { Country } from "../types"
import { gql, useQuery } from "@apollo/client"

interface Countries {
  countries: Country[]
}

interface Props {
  filter: string
}

const Countries: React.FC<Props> = ({ filter }): JSX.Element => {
  const [countryList, setCountryList] = useState<Country[]>([])
  const [filteredList, setFilteredList] = useState<Country[]>([])
  const [activeCountry, setActiveCountry] = useState<Country | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const rndmCountriesInCont: Country[] = []
  const inSameCont: Country[] = countryList
    ? countryList.filter((c: Country) => c.continent.code === activeCountry?.continent?.code)
    : []
  const inSameContTotal: number = inSameCont.length

  const COUNTRIES = gql`
    {
      countries {
        capital
        code
        continent {
          code
        }
        currency
        languages {
          name
        }
        name
      }
    }
  `

  const { loading, error, data } = useQuery<Countries>(COUNTRIES)

  useEffect(() => {
    if (!loading && !error && data) {
      setCountryList(data.countries)
    }
  }, [loading, error, data])

  useEffect(() => {
    document.addEventListener("keydown", escape)

    return () => document.removeEventListener("keydown", escape)
  }, [])

  useEffect(() => {
    if (countryList) {
      const filteredAndSorted: Country[] = [
        ...findMatchInBeginning(countryList, filter),
        ...findMatchElsewhere(countryList, filter),
      ]
      setFilteredList(filteredAndSorted)
    }
  }, [filter, countryList])

  const escape = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setModalIsOpen(false)
    }
  }

  for (let i = 0; i < 3; i++) {
    const randomCountry = inSameCont[Math.floor(Math.random() * inSameCont.length)]
    if (!rndmCountriesInCont.find((c) => c === randomCountry) && randomCountry !== activeCountry) {
      rndmCountriesInCont.push(randomCountry)
    } else {
      i -= 1
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
