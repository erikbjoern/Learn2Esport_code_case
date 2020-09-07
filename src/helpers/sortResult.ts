type Country = {
  capital: string;
  code: string;
  continent: {
    code: string;
  };
  currency: string;
  languages: {
    name: {
      name: string[];
    };
  };
  name: string;
};

export const findMatchInBeginning = (array: Country[], filter: string) => {
  return array
    .filter(
      (country) => 
        country.name.toLowerCase().slice(0, filter.length) === filter
    )
    .sort((a, b) => a["name"].localeCompare(b["name"]))
}

export const findMatchElsewhere = (array: Country[], filter: string) => {
  return array
    .filter(
      (country) =>
        country.name.toLowerCase().slice(0, filter.length) !== filter &&
        country.name.toLowerCase().includes(filter)
    )
    .sort((a, b) => a["name"].localeCompare(b["name"]))
}
