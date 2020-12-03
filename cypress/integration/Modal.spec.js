describe("Modal", () => {
  beforeEach(() => {
    cy.mockGraphQL("allCountries")
    cy.visit("/")
  })

  it("can be opened by using keyboard", () => {
    cy.get("[data-cy=card]").first().focus().trigger("keydown", { keyCode: 13 })
    cy.get("[data-cy=modal]").should("be.visible")
  })

  describe("is opened when a country card is clicked", () => {
    beforeEach(() => {
      cy.get("[data-cy=card]").first().click()
    })

    it("can be closed by clicking outside of it", () => {
      cy.get("[data-cy=modal]").should("be.visible")
      cy.get("[data-cy=overlay]").click({ force: true })
      cy.get("[data-cy=modal]").should("not.exist")
    })

    it("can be closed by hitting 'escape' key", () => {
      cy.get("[data-cy=modal]").should("be.visible")
      cy.get("[data-cy=overlay]").trigger("keydown", { keyCode: 27, force: true })
      cy.get("[data-cy=modal]").should("not.exist")
    })

    it("contains country flag, name and continent", () => {
      cy.get("[data-cy=modal-flag]")
        .find("span")
        .should("have.attr", "class")
        .should("match", /flag-icon/)
      cy.get("[data-cy=modal-name]").should("contain", "Afghanistan")
      cy.get("[data-cy=modal-continent]").should("contain", "Asia")
    })

    it("contains three random countries from the same countries", () => {
      cy.get("[data-cy=other-countries]").should("contain", "Other countries in Asia")
      cy.get("[data-cy=modal-card").should("have.length", 3).should("contain", "Asia")
    })

    it("contains the amount of remaining countries in the same continent", () => {
      cy.get("[data-cy=remaining-amount]").should("contain", "+ 48 more")
    })

    it("clicking '+ 48 more' closes the modal and filters by that continent", () => {
      cy.get("[data-cy=remaining-amount]").click()
      cy.get("[data-cy=modal]").should("not.exist")
      cy.get("[data-cy=search-field]").find("input").should("have.value", "Asia")
      cy.get("[data-cy=countries-heading]").should("contain", "Asia")
      cy.get("[data-cy=amount]").should("contain", "52 / 250")
    })
  })

  describe("Opening the modal when scrolled down, on low viewport", () => {
    beforeEach(() => {
      cy.viewport(1000, 600)
      cy.get("[data-cy=card]").contains("Chile").scrollIntoView()
    })

    it("triggers scroll to top, where the modal appears", () => {
      cy.get("[data-cy=search-field]").topIsNotWithinViewport()
      cy.get("[data-cy=card]").contains("Chile").click()
      cy.wait(1000)
      cy.get("[data-cy=modal]").within(() => {
        cy.get("[data-cy=modal-flag]").isWithinViewport()
      })
    })
  })    
})
