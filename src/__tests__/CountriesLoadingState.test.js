import React from 'react';
import { render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import Countries, { GET_COUNTRIES } from "../components/Countries"
import allCountries from "../../cypress/fixtures/allCountries.json"

const mocks = [
  {
    request: {
      query: GET_COUNTRIES   
    },
    result: allCountries
  }
]

it("Displays message when loading countries", () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Countries filter=""/>
    </MockedProvider>
  )

  expect(getByTestId("loading")).toHaveTextContent('Loading countries . . .');
})
