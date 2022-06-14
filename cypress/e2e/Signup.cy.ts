/// <reference types="cypress" />

describe('Signup.cy.ts', () => {
  it('should load the app', () => {
    cy.visit('/');
  });
  it('it should error because that the user already exists', () => {
    cy.get('[data-testid=return-to-signup]').click();
    cy.get('[data-testid=email]').type('test@test.com');
    cy.get('[data-testid=password]').type('password1');
    cy.get('[data-testid=signin-button]').click();

    cy.contains('error').should('be.visible');
  });
});
