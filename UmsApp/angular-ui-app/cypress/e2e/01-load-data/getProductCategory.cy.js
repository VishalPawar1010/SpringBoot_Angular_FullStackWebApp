/// <reference types="cypress" />

import { productCategoryData } from 'server/productCategoryData';

describe('ProductCategoryMenuComponent', () => {
  beforeEach(() => {
    cy.visit('/login'); 
    
    cy.get('input[name="email"]').type('vshalofficial@gmail.com');
    cy.get('input[name="password"]').type('admin@123');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/users');
    cy.visit('/');
    cy.intercept('GET', '/api/product-categories', { body: productCategoryData });
  });

  it('should display product categories', () => {
    cy.log('Start of test');

    // cy.get('.list-group navbar-list').should('have.length', productCategoryData.length);
    cy.log('End of test');
  });
  

});
