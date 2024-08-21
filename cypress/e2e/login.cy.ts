/// <reference types="cypress" />

describe('Login Page', () => {
    it('should display the login page', () => {
      cy.visit('/login')
      cy.contains('Login')
    })

    it('should log me in, when I enter the correct credentials', () => {
        cy.visit('/login')
        cy.get('input[type="email"]').type('sven@svenhermann.it')
        cy.get('input[type="password"]').type('sven')
        cy.get('button[type="submit"]').click()
        cy.contains('Welcome, Sven Hermann')
    })

    it('should not log me in, when I enter the wrong credentials', () => {
        cy.visit('/login')
        cy.get('input[type="email"]').type('sven@svenhermann.it')
        cy.get('input[type="password"]').type('wrong')
        cy.get('button[type="submit"]').click()
        cy.contains('Invalid password')
    })
  })