

describe('RolesListComponent', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visit the login page
    
    cy.get('input[name="email"]').type('vshalofficial@gmail.com');
    cy.get('input[name="password"]').type('admin@123');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/users');
    cy.intercept('GET', '/api/roles', { fixture: 'roleData.json' }).as('getRoles');
    cy.visit('/roles');
  });

  it('1 should display the roles list', () => {
    cy.wait('@getRoles').then(() => {
      cy.get('table').should('be.visible');
      cy.get('tbody tr').should('have.length', 5);
    });
  });
  
});
