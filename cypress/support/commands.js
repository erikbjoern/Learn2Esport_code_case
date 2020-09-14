import allCountries from "../fixtures/allCountries"

const responseStub = (result) => {
  return Promise.resolve({
    json() {
      return Promise.resolve(result)
    },
    text() {
      return Promise.resolve(JSON.stringify(result))
    },
    ok: true,
  })
}

Cypress.Commands.add("mockGraphQL", (requestedData) => {
  const data = requestedData === "allCountries" ? allCountries : undefined

  cy.on("window:before:load", (win) => {
    win.fetch = (path, { method }) => {
      if (path === "https://countries.trevorblades.com" && method === "POST") {
        console.log("stubbing data from " + path)
        return responseStub(data)
      }
      throw new Error("Unhandled fetch request that needs to be stubbed.")
    }
  })
})

Cypress.Commands.add("mockGraphQLSlow", (requestedData) => {
  const data = requestedData === "allCountries" ? allCountries : undefined

  cy.on("window:before:load", (win) => {
    win.fetch = (path, { method }) => {
      if (path === "https://countries.trevorblades.com" && method === "POST") {
        console.log("stubbing data from " + path)
        return responseStub(data)
      }
      throw new Error("Unhandled fetch request that needs to be stubbed.")
    }
  })
})

Cypress.Commands.add("isWithinViewport", { prevSubject: true }, (subject) => {
  const windowInnerWidth = Cypress.config("viewportWidth")
  const windowInnerHeight = Cypress.config("viewportHeight")

  const bounding = subject[0].getBoundingClientRect()

  const rightBoundOfWindow = windowInnerWidth
  const bottomBoundOfWindow = windowInnerHeight

  expect(bounding.top).to.be.at.least(0)
  expect(bounding.left).to.be.at.least(0)
  expect(bounding.right).to.be.lessThan(rightBoundOfWindow + 1)
  expect(bounding.bottom).to.be.lessThan(bottomBoundOfWindow + 1)

  return subject
})

Cypress.Commands.add("topIsNotWithinViewport", { prevSubject: true }, (subject) => {
  const bounding = subject[0].getBoundingClientRect().top

  expect(bounding).to.be.lessThan(0)

  return subject
})
