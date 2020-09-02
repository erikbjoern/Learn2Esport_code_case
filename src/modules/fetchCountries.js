import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
})

const COUNTRIES = gql`
  {
    countries {
      capital
      continent {
        code
      }
      currency
      emoji
      languages {
        name
      }
      name
    }
  }
`

export const fetchCountries = () => {
  let response
  try {
    response = client.query({
      query: COUNTRIES,
    })
  } catch (error) {
    console.log(error)
  }
  return response
}
