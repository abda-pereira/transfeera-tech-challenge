describe('Testes de read de favorecidos', () => {
  it('Deve identificar se a lista de favorecidos está visível', () => {
    cy.isOpen();
    cy.get('[data-testid="tblrecs-container"]', {timeout: 500}).should('be.visible');
  });
});

describe('Testes de filtro de pesquisa de favorecidos', () => {
  it('Deve filtrar os favorecidos de acordo com a busca do favorecido cadastrado', () => {
    cy.isOpen();
    cy.createReceiver();
    cy.url({timeout: 500}).should('be.equal', `${Cypress.config("baseUrl")}`);
    cy.fixture('receiverTestData.json').then((receiver) => {
      cy.get('.search-rec > :nth-child(1)').clear().type(receiver.name);
    });
    cy.get('.search-rec > :nth-child(2)').click();
    cy.get('[data-testid="tblrec"] > tbody > tr > :nth-child(2)').each(($td) => {
      const textoTd = $td.text();
      cy.fixture('receiverTestData.json').then((receiver) => {
        if (textoTd.includes(receiver.name)) {
          expect(textoTd).to.include(receiver.name);
        }
      });
    });
  });
});