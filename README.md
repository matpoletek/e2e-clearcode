### Running cypress with test runner
To open `Test Runner`:
- in terminal open `root` folder, then use `npm run cypress:open` command

After that the desktop application will open where you can select and run desired test suit.

### Running cypress in CLI
To run specific tests using terminal:
- open `root` folder.
- run all `npx cypress:run `
- run specific file `npx cypress run --spec 'cypress/e2e/frontend/list.cy.js'` 