import { Country } from "../types"

export const findMatchInBeginning = (array: Country[], filter: string) => {
  filter = filter.toLowerCase()

  return array
    .filter(
      (country) =>
        country.name.toLowerCase().slice(0, filter.length) === filter ||
        country.native.toLowerCase().slice(0, filter.length) === filter
    )
    .sort((a, b) => a["name"].localeCompare(b["name"]))
}

export const findMatchElsewhere = (array: Country[], filter: string) => {
  filter = filter.toLowerCase()
  
  return filter.length < 3
    ? []
    : array
        .filter(
          (country) =>
            country.name.toLowerCase().slice(0, filter.length) !== filter &&
            country.native.toLowerCase().slice(0, filter.length) !== filter &&
            (country.name.toLowerCase().includes(filter) ||
              country.native.toLowerCase().includes(filter))
        )
        .sort((a, b) => a["name"].localeCompare(b["name"]))
}
