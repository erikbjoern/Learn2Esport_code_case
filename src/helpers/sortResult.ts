import { Country } from "../types"

export const findMatchInBeginning = (array: Country[], filter: string) => {
  const startsWithSearchText = new RegExp("^" + filter.toLowerCase())

  return array
    .filter(
      (country) =>
        country.name.toLowerCase().match(startsWithSearchText) ||
        country.native.toLowerCase().match(startsWithSearchText)
    )
    .sort((a, b) => a["name"].localeCompare(b["name"]))
}

export const findMatchElsewhere = (array: Country[], filter: string) => {
  const containsSearchTextButNotInBeginning = new RegExp("(?<!^)" + filter.toLowerCase())

  return filter.length < 3
    ? []
    : array
        .filter(
          (country) =>
            country.name.toLowerCase().match(containsSearchTextButNotInBeginning)
        )
        .sort((a, b) => a["name"].localeCompare(b["name"]))
}
