/// <reference types="cypress" />


describe('User Registration', () => {
  it('should show the register page', () => {
    cy.visit('/register');
    cy.get('h1').should('contain', 'Registration');
  });

//   it('should register a new user', () => {
//     cy.visit('/register');
//     cy.get('input[name="email"]').type('testuser@test.com');
//     cy.get('input[name="password"]').type('testpassword');
//     cy.get('input[name="confirmPassword"]').type('testpassword');
//     cy.get('button[type="submit"]').click();
//   });
});
