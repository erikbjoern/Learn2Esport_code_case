describe("Countries", () => {
  beforeEach(() => {
    cy.mockGraphQL("allCountries")
    cy.visit("/")
  })

  it("has heading 'All countries'", () => {
    cy.get("[data-cy=countries-heading]").should("contain", "All countries")
  });
  
  it("heading changes when searching for a continent", () => {
    cy.get("[data-cy=search-field]").find("input").type("europe")
    cy.get("[data-cy=countries-heading]").should("contain", "Europe")
  })
  
  it("displays amount of countries matching, out of total count", () => {
    cy.get("[data-cy=amount]").should("contain", "250 / 250")
    cy.get("[data-cy=search-field]").find("input").type("asia")
    cy.get("[data-cy=amount]").should("contain", "52 / 250")
    cy.get("[data-cy=search-field]").find("input").clear()
    cy.get("[data-cy=search-field]").find("input").type("sweden")
    cy.get("[data-cy=amount]").should("contain", "1 / 250")
  })

  it("displays error message if any", () => {
    cy.mockGraphQL("noData")
    cy.visit("/")
    cy.get("[data-cy=error]").should("contain", "Something went wrong :(  Try reloading!").should("be.visible")
  })
})