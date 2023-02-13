const { _ } = Cypress;
const toStrings = (cells$) => _.map(cells$, 'textContent');

describe('As a user I want to manage list of episodes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('changes number of items per page', () => {
    cy.changeItemsPerPage("12");
    cy.get('.row:visible').should('have.length', 12);
  });

  it('searches for the phrase', () => {
    const searchPhrase = "FOX NFL Sunday";
    // search for a phrase
    cy.searchPhrase(searchPhrase);
    cy.get('.row:visible').each((el) => {
      cy.wrap(el).should('contain.text', searchPhrase);
    });
    // clear search input
    cy.get('.clearSearch').click();
    cy.get('[ng-model="search"]').should('have.value', '');
    cy.get('.row:visible').should('have.length', 12);
  });

  it('adds episode to favorites', () => {
    cy.intercept('GET', '**/pages/details.html').as('details');
    cy.intercept('GET', '**/schedule').as('schedule');
    const episodeName = "Good Morning America";
    // visit details and add to favorites
    cy.get(`.row:visible:contains(${episodeName})`).click();
    cy.wait('@details').its('response.statusCode').should('equal', 200);
    cy.get('[alt="delete fav"]').click();
    cy.get('[alt="delete fav"]').should('not.be.visible');
    // check if added episode is visible in the list
    cy.contains('Back').click();
    cy.wait('@schedule').its('response.statusCode').should('equal', 200);
    cy.get(`.row:visible:contains(${episodeName}) [alt="add to fav"]`).should('be.visible');
    // visit details and remove from favorites
    cy.get(`.row:visible:contains(${episodeName}) [alt="add to fav"]`).click();
    cy.get('[alt="add to fav"]').click();
    cy.get('[alt="add to fav"]').should('not.be.visible');
    // check if episode is no longer visible in the list
    cy.contains('Back').click();
    cy.wait('@schedule').its('response.statusCode').should('equal', 200);
    cy.get(`.row:visible:contains(${episodeName}) [alt="add to fav"]`).should('not.exist');
  });

  it('sorts the list by time', () => {
    // sort by name descending
    cy.get('.rowHeader:eq(1) div:contains(Time)')
      .click()
      .find('.glyphicon')
      .should('have.class', 'glyphicon-chevron-up');

    cy.get('.row:visible div:nth-of-type(3)')
      .then(toStrings)
      .then((names) => {
        const sorted = _.sortBy(names).reverse();
        expect(names).to.deep.equal(sorted);
      });
    // sort by name ascending
    cy.get('.rowHeader:eq(1) div:contains(Time)')
      .click()
      .find('.glyphicon')
      .should('have.class', 'glyphicon-chevron-down');

    cy.get('.row:visible div:nth-of-type(3)')
      .then(toStrings)
      .then((names) => {
        const sorted = _.sortBy(names);
        expect(names).to.deep.equal(sorted);
      });
  });
});
