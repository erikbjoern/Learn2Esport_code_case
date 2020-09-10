describe("Header", () => {
  beforeEach(() => {
    cy.mockGraphQL("allCountries")
    cy.visit("/")
  })

  it("contains L2E logo", () => {
    cy.get("[data-cy=header]").within(() => {
      cy.get("img").should("have.attr", "alt").should("contain", "Learn2Esport logo")
    })
  })

  it("stays visible when scrolling", () => {
    cy.scrollTo(0, 1000).get("[data-cy=header]").isWithinViewport()
  })
})