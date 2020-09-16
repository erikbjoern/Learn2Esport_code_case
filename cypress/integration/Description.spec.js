describe("Description", () => {
  beforeEach(() => {
    cy.mockGraphQL("allCountries")
    cy.visit("/")
  })

  it("renders with lorem ipsum", () => {
    cy.get("[data-cy=description]").should("contain", "Lorem IpsumSit dolor")
  })

  it("renders with background-image", () => {
    cy.get("[data-cy=description]").should("have.css", "background-image").should("match", /anivia_background/)
  })
})