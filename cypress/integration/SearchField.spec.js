describe("SearchField", () => {
  beforeEach(() => {
    cy.mockGraphQL("allCountries")
    cy.visit("/")
    cy.get("[data-cy=search-field]").find("input").as("input")
  })

  it("renders with placeholder text", () =>{
    cy.get("@input").should("have.attr", "placeholder").should("contain", "Search for a country")
  })

  it("renders with a search glass icon", () => {
    cy.get("[data-cy=search-field]").find("i.fas.fa-search").should("be.visible")
  })

  it("displays a cross when typed into, which clears field when clicked", () => {
    cy.get("[data-cy=search-field]").find("i.fas.fas-times").should("not.be.visible")
    cy.get("@input").type("Anything")
    cy.get("[data-cy=search-field]").find("i.fas.fa-times").should("be.visible").click()
    cy.get("@input").should("have.value", "")
  })

  it("triggers slight scrolling when focused", () => {
    cy.get("@input").focus()
    cy.wait(500)
    cy.get("[data-cy=description]").topIsNotWithinViewport()
  })
})