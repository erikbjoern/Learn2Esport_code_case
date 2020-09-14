describe("CountryCard", () => {
  beforeEach(() => {
    cy.mockGraphQL("allCountries")
    cy.visit("/")
  })

  it("renders with flag, name, capital, continent, languages and currencies", () => {
    cy.get("[data-cy=card]").first()
      .within(() => {
        cy.get("span")
          .should("have.attr", "class")
          .should("match", /flag-icon/)
      })
    cy.get("[data-cy=card]").first()
      .should("contain", "Afghanistan")
      .should("contain", "Kabul ● Asia ● Pashto, Uzbek, Turkmen ● AFN")
  })
})
