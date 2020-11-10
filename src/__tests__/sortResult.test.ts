import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import * as allCountries from "../../cypress/fixtures/allCountries.json"
import { Country } from "../types"

const countries: Country[] = allCountries.data.countries

const botswana    = countries.find(country => country.name === "Botswana")
const swaziland   = countries.find(country => country.name === "Swaziland")
const sweden      = countries.find(country => country.name === "Sweden")
const switzerland = countries.find(country => country.name === "Switzerland")

it("Finds countries which names start with the search string", () => {
  expect(findMatchInBeginning(countries, "Sw")).toStrictEqual([
    swaziland, sweden, switzerland
  ])
})

it("Is case insensitive", () => {
  expect(findMatchInBeginning(countries, "sw")).toStrictEqual([
    swaziland, sweden, switzerland
  ])
})

it("Finds countries that contains the string, if the string is at least 3 characters", () => {
  expect(findMatchElsewhere(countries, "Swa")).toStrictEqual([
    botswana
  ])
})

it("Finds countries based on native name", () => {
  expect(findMatchInBeginning(countries, "Sver")).toStrictEqual([
    sweden
  ])
})

it("Does not find by native name unless it starts with the search string", () => {
  expect(findMatchInBeginning(countries, "verige")).not.toStrictEqual([
    sweden
  ])
  expect(findMatchElsewhere(countries, "verige")).not.toStrictEqual([
    sweden
  ])
})