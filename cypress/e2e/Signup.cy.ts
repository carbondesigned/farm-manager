/// <reference types="cypress" />

describe('Signup.cy.ts', () => {
  it('should load the app', () => {
    cy.visit('/');
  });
  it('it should signup', () => {
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('password1');
    cy.get('#signup-button').click();
    cy.contains('Sign In').should('be.visible');
  });
});
