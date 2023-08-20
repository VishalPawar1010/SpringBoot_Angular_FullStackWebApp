describe('My First Cypress Test', () => {
    it('Visits the homepage and asserts page title', () => {
      // Visit the homepage
      cy.visit('http://localhost:4200/login');
  
      // Assert the page title
      cy.title().should('include', 'ArguShop');
    });
  });
  