/// <reference types="cypress" />


describe('Products', () => {
    beforeEach(() => {
    
        cy.visit('/login'); 
    
        cy.get('input[name="email"]').type('vshalofficial@gmail.com');
        cy.get('input[name="password"]').type('admin@123');
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/users');
      
    });
  
    it('should load roles data', () => {
        cy.visit('/products'); 
        cy.url().should('include', '/products');
        // cy.wait(2000);
        cy.get('.product-box').should('have.length.greaterThan', 0);
    });
  });
  