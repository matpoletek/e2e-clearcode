/// <reference types='cypress' />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Changes items per page
         *
         * @param {string} number
         * @returns {Chainable<Element>}
         * @example
         * cy.changeItemsPerPage("25")
         */
        changeItemsPerPage(number: string): Chainable<void>;

        /**
         * Searching for phrase using search input
         *
         * @param {string} phrase
         * @returns {Chainable<Element>}
         * @example
         * cy.searchPhrase("Phrase")
         */
        searchPhrase(phrase: string): Chainable<void>;
    }
}