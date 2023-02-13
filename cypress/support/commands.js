Cypress.Commands.add('changeItemsPerPage', (number) => {
  cy.get('[ng-model="perPage"]').first().select(number);
  cy.get('[ng-model="perPage"]').should('contain.text', number);
});

Cypress.Commands.add('searchPhrase', (phrase) => {
  cy.get('[ng-model="search"]').type(phrase);
  cy.get('[ng-model="search"]').should('contain.value', phrase);
});