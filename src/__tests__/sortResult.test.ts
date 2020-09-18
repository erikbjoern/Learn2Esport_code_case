import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import * as allCountries from "../../cypress/fixtures/allCountries.json"
import { Country } from "../types"

const countries: Country[] = allCountries.data.countries

const botswana    = countries[34]
const swaziland   = countries[212]
const sweden      = countries[196]
const switzerland = countries[42]

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