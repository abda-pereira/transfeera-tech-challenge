describe('Testes de create de favorecido', () => {
  it('Deve criar um novo favorecido', () => {
    cy.isOpen();
    cy.createReceiver();
    cy.url({timeout: 500}).should('be.equal', `${Cypress.config("baseUrl")}`);
  });
});

describe('Testes de erro no create de favorecido', () => {
  it('Deve apresentar erro ao tentar salvar novo favorecido sem o email', () => {
    cy.isOpen();
    cy.get('[data-testid="btn-createrec"]', {timeout: 500}).click();
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}receiver`);
    cy.get('[data-testid="email-rec"]').clear();
    cy.get('[data-testid="btn-saverec"]').click();
    cy.get('.rnc__notification-item--danger', {timeout: 500}).should('be.visible');
  });
});