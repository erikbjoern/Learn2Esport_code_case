describe("Search functionality", () => {
  beforeEach(() => {
    cy.mockGraphQL("allCountries")
    cy.visit("/")
    cy.get("[data-cy=search-field]").find("input").as("input")
  })

  it("returns all countries when search field is empty", () => {
    cy.get("[data-cy=card]").should("have.length", 250)
  })

  it("returns countries that start with the search string", () => {
    cy.get("@input").type("Saint")
    cy.get("[data-cy=card]").should("have.length", 7)
    cy.get("[data-cy=card]").first().should("contain", "Saint Barthélemy")
  })

  it("is case insensitive", () => {
    cy.get("@input").type("saint")
    cy.get("[data-cy=card]").should("have.length", 7)
    cy.get("[data-cy=card]").first().should("contain", "Saint Barthélemy")
  })
  
  it("when the search string is at least 3 letters, countries containing it are included last", () => {
    cy.get("@input").type("an")
    cy.get("[data-cy=card]").should("have.length", 5)
    cy.get("[data-cy=card]").last().should("contain", "Antigua and Barbuda")
    cy.get("@input").clear()
    cy.get("@input").type("stan")
    cy.get("[data-cy=card]").should("have.length", 7)
    cy.get("[data-cy=card]").last().should("contain", "Uzbekistan")
  })

  it("takes native names into account", () => {
    cy.get("@input").type("suomi")
    cy.get("[data-cy=card]").should("have.length", 1)
    cy.get("[data-cy=card]").first().should("contain", "Finland")
  })

  it("does not find by native name unless it starts with the search string", () => {
    cy.get("@input").type("uomi")
    cy.get("[data-cy=card]").should("have.length", 0)
  })

  it("filters by continent if the exact name is entered", () => {
    cy.get("@input").type("north america")
    cy.get("[data-cy=card]").should("have.length", 41)
  })
})