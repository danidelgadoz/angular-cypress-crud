describe('Catalog' , () => {

  it('Should load books on page load', () => {
    cy.seedAndVisit()

    cy.get('app-book-catalog app-book-card')
      .should('have.length', 3)
  })

  it('Should display an error failure', () => {
    cy.server()
    cy.route({
      url: '/books',
      method: 'GET',
      status: 500,
      response: {}
    })
    cy.visit('/')

    cy.get('app-book-catalog app-book-card')
      .should('not.exist')

    cy.contains('Ups! Error loading books')
      .should('be.visible')
  })
})
