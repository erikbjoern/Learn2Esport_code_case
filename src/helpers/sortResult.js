export const findMatchInBeginning = (array, filter) => {
  return array
    .filter(
      (country) => 
        country.name.toLowerCase().slice(0, filter.length) === filter
    )
    .sort((a, b) => a["name"].localeCompare(b["name"]))
}

export const findMatchElsewhere = (array, filter) => {
  return array
    .filter(
      (country) =>
        country.name.toLowerCase().slice(0, filter.length) !== filter &&
        country.name.toLowerCase().includes(filter)
    )
    .sort((a, b) => a["name"].localeCompare(b["name"]))
}
