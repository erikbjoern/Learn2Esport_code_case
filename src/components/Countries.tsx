import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import Modal from "./Modal"
import { gql, useQuery } from "@apollo/client"
import { findCountries } from "../helpers/findCountries"
import { capitalize } from "../helpers/capitalize"
import { continentNames, continentCodes } from "../modules/continents"
import { Country } from "../types"
import styles from "../stylesheets/Countries.module.css"

export const GET_COUNTRIES = gql`
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
}`

interface Countries {
  countries: Country[]
}

interface Props {
  searchString: string
  setSearchString: React.Dispatch<React.SetStateAction<string>>
}

const Countries: React.FC<Props> = ({ searchString = "", setSearchString }): JSX.Element => {
  const [countryList, setCountryList] = useState<Country[]>([])
  const [filteredList, setFilteredList] = useState<Country[]>([])
  const [activeCountry, setActiveCountry] = useState<Country | null>(null)
  const [heading, setHeading] = useState("")
  const { loading, error, data } = useQuery<Countries>(GET_COUNTRIES)

  useEffect(() => {
    if (!loading && !error && data) {
      setCountryList(data.countries)
    }
  }, [loading, error, data])

  useEffect(() => {
    if (countryList) {
      if (
        Object.values(continentNames)
          .map((c: any) => c.toLowerCase())
          .includes(searchString.toLowerCase())
      ) {
        const continentName = capitalize(searchString)
        const searchByCont = countryList.filter(
          (c: Country) => c.continent.code === continentCodes[continentName]
        )
        setFilteredList(searchByCont)
        setHeading(continentName)
      } else {
        const matchingCountries = findCountries(countryList, searchString)
        setFilteredList(matchingCountries)
        setHeading("")
      }
    }
  }, [searchString, countryList])

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
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
          countryList={countryList}
          setSearchString={setSearchString}
        />
      )}
      <div>
        <h2 className={styles.heading} data-cy="countries-heading">
          {heading ? heading : "All countries"}
        </h2>
        <p className={styles.amount} data-cy="amount">
          {filteredList.length} / {countryList.length}
        </p>
        <div className={styles.cardContainer} data-testid="country-cards">{countryCards}</div>
        {loading && (
          <p data-testid="loading" className={styles.loading}>
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
