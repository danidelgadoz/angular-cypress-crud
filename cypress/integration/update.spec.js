describe('Edit Page' , () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', '/books/**', 'fixture:book').as('FindOneApi')
    cy.route('PUT', '/books/**', 'fixture:book').as('UpdateApi')

    cy.fixture('book').then((book)  => {
      this.mockedBook = book
      cy.visit(`/book/${this.mockedBook._id}`)
      cy.wait('@FindOneApi')
    })
  })

  describe('Form', () => {
    it('Should load book form on page load', () => {
      const favoriteCheckboxAssert = this.mockedBook.favorite ? 'be.checked' : 'not.be.checked';
      cy.get('[formcontrolname=author]').should('have.value', this.mockedBook.author)
      cy.get('[formcontrolname=description]').should('have.value', this.mockedBook.description)
      cy.get('[formcontrolname=favorite] input').should(favoriteCheckboxAssert)
      cy.get('[formcontrolname=posterImgPath]').should('have.value', this.mockedBook.posterImgPath)
      cy.get('[formcontrolname=title]').should('have.value', this.mockedBook.title)
    })
  })

  describe('Update', () => {
    const updatedTitle = 'New Title';
    beforeEach(() => {
      cy.get('[formcontrolname=title]')
        .clear()
        .type(updatedTitle)

      cy.contains('SAVE').click()
      cy.wait('@UpdateApi')
    })

    it('Should display successful message', () => {
      cy.contains('Book updated!').should('be.visible')
    })

    it('Should update book on the catalog', () => {
      cy.fixture('books').then((books) => {
        const updatedIndex = books.findIndex(b => b._id === this.mockedBook._id)
        books[updatedIndex].title = updatedTitle;
        cy.seedAndVisit(books)
      })

      cy.get('app-book-card')
        .first()
        .find('.mat-card-title')
        .contains(updatedTitle)
    })
  })

})

