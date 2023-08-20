import { AuthService } from '../../../src/app/auth.service';

Cypress.Commands.add('injectAuthService', () => {
  cy.window().then((win) => {
    win.authService = new AuthService();
  });
});

describe('Logout Service', () => {
  let  authService = new AuthService();;

  beforeEach(() => {
    // authService = new AuthService();
    cy.stub(authService, 'logout');
    cy.visit('/login'); // Visit the login page
    cy.window().then((win) => {
      win.authService = authService;
    });
    cy.get('input[name="email"]').type('vshalofficial@gmail.com');
    cy.get('input[name="password"]').type('admin@123');
    cy.get('input[type="submit"]').click();
  });
  it('should logout the user and redirect to the login page', () => {
    cy.visit('/users');
    cy.get('[data-testid="logout"]').click(); // Simulate click on the logout button
    cy.visit('/logout'); 
    // Assert that the logout function has been called
    // cy.window().then((win) => {
    //   cy.spy(win.authService, 'logout').as('logoutSpy');
    // });
    // cy.get('@logoutSpy').should('have.been.called');

    cy.url().should('include', '/login');
  });

});

