describe('Testes de delete de favorecido', () => {
  it('Deve excluir um único favorecido através da modal', () => {
    cy.isOpen();
    cy.get('[data-testid="tblrec"] > tbody > :nth-child(1) > :nth-child(2) > span', {timeout: 500})
    .click();
    cy.get('[data-testid="modal-recedit"]', {timeout: 100}).should('be.visible');
    cy.get('[data-testid="btn-delrec"]').click();
    cy.get('[data-testid="modal-confirmation"]', {timeout: 100}).should('be.visible');
    cy.get('[data-testid="btn-confirmation"]').click();
    cy.get('.rnc__notification-item--success', {timeout: 100}).should('be.visible');
  });
});

describe('Testes de delete de múltiplos favorecidos', () => {
  it('Deve excluir dois favorecidos através do botão de excluir selecionados', () => {
    cy.isOpen();
    cy.get('[data-testid="tblrec"] > tbody > :nth-child(1) > :nth-child(1) > input', {timeout: 500})
    .click();
    cy.get('[data-testid="tblrec"] > tbody > :nth-child(2) > :nth-child(1) > input').click();    
    cy.get('[data-testid="btn-delrecs"]').click();
    cy.get('.rnc__notification-item--success', {timeout: 500}).should('be.visible');
  });
});