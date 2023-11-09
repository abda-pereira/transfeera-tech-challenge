Cypress.Commands.add('isOpen', () => {
    cy.visit('/');
});

Cypress.Commands.add('createReceiver', () => {
    cy.get('[data-testid="btn-createrec"]', {timeout: 500}).click();
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}receiver`);
    cy.fixture('receiverTestData.json').then((receiver) => {
      cy.get('[data-testid="name-rec"]').type(receiver.name);
      cy.get('[data-testid="taxid-rec"]').type(receiver.tax_id);
      cy.get('[data-testid="email-rec"]').type(receiver.email);
      cy.get('[data-testid="pixkey-rec"]').type(receiver.pix_key);
    });
    cy.get('[data-testid="btn-saverec"]').click();
});