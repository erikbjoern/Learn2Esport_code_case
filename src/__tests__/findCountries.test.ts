import { findCountries } from "../helpers/findCountries"
import * as allCountries from "../../cypress/fixtures/allCountries.json"
import { Country } from "../types"

const countries: Country[] = allCountries.data.countries

const botswana    = countries.find(country => country.name === "Botswana")
const swaziland   = countries.find(country => country.name === "Swaziland")
const sweden      = countries.find(country => country.name === "Sweden")
const switzerland = countries.find(country => country.name === "Switzerland")

it("Finds countries which names start with the search string", () => {
  expect(findCountries(countries, "Sw")).toStrictEqual([
    swaziland, sweden, switzerland
  ])
})

it("Is case insensitive", () => {
  expect(findCountries(countries, "sw")).toStrictEqual([
    swaziland, sweden, switzerland
  ])
})

it("Finds countries that contains the string, if the string is at least 3 characters", () => {
  expect(findCountries(countries, "Swa")).toStrictEqual([
    swaziland, botswana
  ])
})

it("Finds countries based on native name", () => {
  expect(findCountries(countries, "Sver")).toStrictEqual([
    sweden
  ])
})

it("Does not find by native name unless it starts with the search string", () => {
  expect(findCountries(countries, "verige")).not.toStrictEqual([
    sweden
  ])
})