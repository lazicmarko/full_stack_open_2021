/// <reference types="cypress" />

describe('Bloglist app', () => {
  beforeEach(function  (){
    cy.request('POST','http://localhost:3003/api/testing/reset')
    cy.createUser({ name: 'root', username: 'root', password: 'root' })
    cy.createUser({ name: 'guest', username: 'guest', password: 'guest' })
    cy.visit('http://localhost:3000')
  })
  it('should open the frontpage', () => {
    cy.contains('Bloglist app')
  })

  it('should contain login form', () => {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click()
      cy.login({ username: 'root', password: 'root' })
      cy.contains('root logged in')
    })
    it('fails with wrong credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('rootz')
      cy.get('#password').type('rootz')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html')
        .should('not.contain', 'rootz logged in')
    })
  })

  describe('When logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'root' })
    })

    it('A blog can be created', () => {
      const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url'
      }

      cy.createBlog(blog)
      cy.showSuccessMessage(`A new blog ${blog.title} by ${blog.author} added.`)
      cy.get('.blog')
        .should('contain', 'test title - test author')
    })
  })

  describe('When logged in and blogs are created', () => {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'root' })

      const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url'
      }

      cy.createBlog(blog)
      cy.showSuccessMessage(`A new blog ${blog.title} by ${blog.author} added.`)

      cy.login({ username: 'guest', password: 'guest' })
      const guestBlog = {
        title: 'guest title',
        author: 'guest author',
        url: 'guest url'
      }

      cy.createBlog(guestBlog)
      cy.showSuccessMessage(`A new blog ${guestBlog.title} by ${guestBlog.author} added.`)


      cy.login({ username: 'root', password: 'root' })
    })
    it('should be able to like blog', () => {
      cy.contains('test title').parent().find('.view-button').click()
      cy.contains('test title').parent().contains('likes 0')
      cy.contains('test title').parent().find('.like-button').click()
      cy.contains('test title').parent().contains('likes 1')

      cy.showSuccessMessage('test title liked')
    })

    it('should be able to delete own blog', () => {
      cy.contains('test title').parent().find('.view-button').click()
      cy.contains('test title').parent().find('.remove-btn').click()

      cy.showSuccessMessage('test title removed')
      cy.get('html')
        .should('not.contain', 'test url')
    })

    it('should not be able to delete others blog', () => {
      cy.contains('guest title').parent().find('.view-button').click()
      cy.contains('guest title').parent().should('not.contain', 'remove')
    })

    it('should sort blogs by likes', () => {
      cy.get('#bloglist').first().contains('test title')
      cy.contains('guest title').parent().find('.view-button').click()
      cy.contains('guest title').parent().find('.like-button').click()
      cy.contains('guest title').parent().find('.likes').contains('1')
      cy.get('#bloglist').first().contains('guest title')
    })
  })
})

