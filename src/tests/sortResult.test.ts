import { findMatchInBeginning, findMatchElsewhere } from "../helpers/sortResult"
import * as allCountries from "../../cypress/fixtures/allCountries.json"
import { Country } from "../types"

const countries: Country[] = allCountries.data.countries

const botswana = countries[34]
const swaziland = countries[212]
const sweden = countries[196]
const switzerland = countries[42]

console.log(`botswana: ${botswana.name}, swaziland: ${swaziland.name}, sweden: ${sweden.name}, switzerland: ${switzerland.name}`)

test("Finds countries which names start with the string", () => {
  expect(findMatchInBeginning(countries, "Sw")).toStrictEqual([
    swaziland, sweden, switzerland
  ])
})

test("Is case insensitive", () => {
  expect(findMatchInBeginning(countries, "sw")).toStrictEqual([
    swaziland, sweden, switzerland
  ])
})

test("Finds countries that contains the string, if the string is at least 3 characters", () => {
  expect(findMatchElsewhere(countries, "Swa")).toStrictEqual([
    botswana
  ])
})