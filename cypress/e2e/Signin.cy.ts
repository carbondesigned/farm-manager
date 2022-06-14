/// <reference types="cypress" />

describe('Signin.cy.ts', () => {
  it('should load the app', () => {
    cy.visit('/');
  });
  it('it should signin', () => {
    cy.get('[data-testid=email]').type('test@test.com');
    cy.get('[data-testid=password]').type('password1');
    cy.get('[data-testid=signin-button]').click();
    cy.contains('Home').should('be.visible');
  });
});
