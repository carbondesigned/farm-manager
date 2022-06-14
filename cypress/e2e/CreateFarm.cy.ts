describe('empty spec', () => {
  it('signs in', () => {
    cy.visit('/');
    cy.get('[data-testid=email]').type('test@test.com');
    cy.get('[data-testid=password]').type('password1');

    cy.get('[data-testid=signin-button]').click();
    cy.contains('Home').should('be.visible');
  });
  it('goes to creation screen', () => {
    cy.get('[data-testid=create-farm-button]').click();
    cy.contains('Create Farm').should('be.visible');
  });
  it('creates a farm', () => {
    cy.get('[data-testid=farm-name]').type('Test Farm');
    cy.get('[data-testid=farm-about]').type('Test Farm About');
    cy.get('[data-testid=farm-address]').type('Test Farm Address');
    cy.get('[data-testid=farm-phone]').type('123-123-1234');
    cy.get('[data-testid=farm-website]').type('https://google.com');
    cy.get('[data-testid=create-farm-button]').click({
      multiple: true,
      force: true,
    });
    cy.contains('Home').should('be.visible');
  });
});
