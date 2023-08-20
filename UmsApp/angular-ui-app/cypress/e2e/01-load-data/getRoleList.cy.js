/// <reference types="cypress" />


describe('Roles', () => {
    beforeEach(() => {
    
        cy.visit('/login'); 
    
        cy.get('input[name="email"]').type('vshalofficial@gmail.com');
        cy.get('input[name="password"]').type('admin@123');
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/users');
      
    });
  
    it('should load roles data', () => {
        cy.visit('/roles'); 
        cy.url().should('include', '/roles');
        cy.get('.table tbody tr').should('have.length.greaterThan', 0);
    });
  });
  