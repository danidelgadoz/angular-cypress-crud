Cypress.Commands.add("seedAndVisit", (fixture = 'fixture:books') => {
  cy.server()
  cy.route('GET', '/books', fixture)
  cy.visit('/')
})
