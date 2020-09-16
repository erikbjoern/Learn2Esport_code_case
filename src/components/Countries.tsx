import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import Modal from "./Modal"
import { gql, useQuery } from "@apollo/client"
import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import { capitalize } from "../helpers/capitalize"
import { continentNames, continentCodes } from "../modules/continents"
import { Country } from "../types"
import styles from "../stylesheets/Countries.module.css"

interface Countries {
  countries: Country[]
}

interface Props {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Countries: React.FC<Props> = ({ filter, setFilter }): JSX.Element => {
  const [countryList, setCountryList] = useState<Country[]>([])
  const [filteredList, setFilteredList] = useState<Country[]>([])
  const [activeCountry, setActiveCountry] = useState<Country | null>(null)
  const [heading, setHeading] = useState("")
  const inSameCont: Country[] = countryList
    ? countryList.filter((c: Country) => c.continent.code === activeCountry?.continent?.code)
    : []
  const rndmCountriesInCont: Country[] = []
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
        native
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
      if (
        Object.values(continentNames)
          .map((c: any) => c.toLowerCase())
          .includes(filter.toLowerCase())
      ) {
        const continentName = capitalize(filter)
        const searchByCont = countryList.filter(
          (c: Country) => c.continent.code === continentCodes[continentName]
        )
        setFilteredList(searchByCont)
        setHeading(continentName)
      } else {
        const filteredAndSorted: Country[] = [
          ...findMatchInBeginning(countryList, filter),
          ...findMatchElsewhere(countryList, filter),
        ]
        setFilteredList(filteredAndSorted)
        setHeading("")
      }
    }
  }, [filter, countryList])

  const escape = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setActiveCountry(null)
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
      activeCountry={activeCountry}
      fromModal={false}
    />
  ))

  return (
    <>
      {activeCountry && (
        <Modal
          country={activeCountry}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
          rndmCountriesInCont={rndmCountriesInCont}
          total={inSameContTotal}
          setFilter={setFilter}
        />
      )}
      <div>
        <h2 className={styles.heading} data-cy="countries-heading">
          {heading ? heading : "All countries"}
        </h2>
        <p className={styles.amount} data-cy="amount">
          {filteredList.length} / {countryList.length}
        </p>
        <div className={styles.cardContainer}>{countryCards}</div>
        {loading && (
          <p data-cy="loading" className={styles.loading}>
            Loading countries . . .
          </p>
        )}
        {error && (
          <p data-cy="error" className={styles.error}>
            Something went wrong :( <br />
            <br /> Try reloading!
          </p>
        )}
      </div>
    </>
  )
}

export default Countries
