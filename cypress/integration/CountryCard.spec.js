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

  it("can be focused using 'tab' key", () => {
    cy.get("[data-cy=card]").should("have.attr", "tabindex").should("eq", "0")
  })

  it("when modal is open, only the cards in it can be focused", () => {
    cy.get("[data-cy=card]").first().click()
    cy.get("[data-cy=card]").first().should("not.have.attr", "tabindex")
    cy.get("[data-cy=modal-card").should("have.attr", "tabindex").should("eq", "0")
  })
})
