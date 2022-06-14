// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Init.cy.ts', () => {
  it('should load the app', () => {
    cy.visit('/');
  });
});
