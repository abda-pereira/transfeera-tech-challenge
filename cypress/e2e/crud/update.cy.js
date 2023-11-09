describe('Testes de update de favorecido', () => {
  it('Deve salvar alterações de dados do favorecido', () => {
    cy.isOpen();
    cy.get('[data-testid="tblrec"] > tbody > :nth-child(1) > :nth-child(2) > span', {timeout: 500})
    .click();
    cy.get('[data-testid="modal-recedit"]', {timeout: 100}).should('be.visible');
    cy.fixture('receiverTestData.json').then((receiver) => {
      cy.get('[data-testid="email-rec"]').clear().type(receiver.email);
    });
    cy.get('[data-testid="btn-updaterec"]').click();
    cy.get('.rnc__notification-item--success', {timeout: 500}).should('be.visible');
  });
});

describe('Testes de erro no update de favorecido', () => {
  it('Deve apresentar erro ao tentar salvar alterações sem o email do favorecido', () => {
    cy.isOpen();
    cy.get('[data-testid="tblrec"] > tbody > :nth-child(1) > :nth-child(2) > span', {timeout: 500})
    .click();
    cy.get('[data-testid="modal-recedit"]', {timeout: 100}).should('be.visible');
    cy.get('[data-testid="email-rec"]').clear();
    cy.get('[data-testid="btn-updaterec"]').click();
    cy.get('.rnc__notification-item--danger', {timeout: 500}).should('be.visible');
  });
});