// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/login',
    failOnStatusCode: false,
    body: {
      username, password
    }
  }).then(response => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/users',
    body: {
      name, username, password
    }
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('new blog')
    .click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#create-blog-button').click()
})

Cypress.Commands.add('showSuccessMessage', (message) => {
  cy.get('.success')
    .should('contain', message)
    .and('have.css', 'color', 'rgb(0, 128, 0)')
    .and('have.css', 'border-style', 'solid')
})
