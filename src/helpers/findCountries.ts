import { Country } from "../types"

export const findCountries = (countryList: Country[], searchString: string) => {
  const startsWithSearchText = new RegExp("^" + searchString.toLowerCase())
  const countriesBeginningWithSearchText = countryList.filter(
    (country) =>
      country.name.toLowerCase().match(startsWithSearchText) ||
      country.native.toLowerCase().match(startsWithSearchText)
  )
  .sort((a, b) => a["name"].localeCompare(b["name"]))

  if (searchString.length < 3) {
    return countriesBeginningWithSearchText
  }
  
/* If the search string is at least three letters, the result will contain matches from anywhere in 
   the name, but they won't get sorted alphabetically among the others, but instead added at the end. */

  const containsSearchTextButNotInBeginning = new RegExp("(?<!^)" + searchString.toLowerCase())
  const countriesContainingSearchTextElsewhere = countryList.filter(
    (country) =>
    country.name.toLowerCase().match(containsSearchTextButNotInBeginning)
    )
    .sort((a, b) => a["name"].localeCompare(b["name"]))

  return countriesBeginningWithSearchText.concat(countriesContainingSearchTextElsewhere)
}