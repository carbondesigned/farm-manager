describe('Signout.cy.ts', () => {
  it('should load page', () => {
    cy.visit('/');
  });
  it('should signout', () => {
    cy.get('[data-testid=signout-button]').click();

    cy.contains('Sign In').should('be.visible');
  });
});
