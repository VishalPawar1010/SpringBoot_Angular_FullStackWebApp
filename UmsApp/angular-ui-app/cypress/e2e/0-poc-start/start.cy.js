describe('e2e e-commerce app -> LOGIN', () => {
  beforeEach(() => {
    cy.visit('/login');
  });


  it('this is first login test case', () => {
    cy.visit('http://localhost:4200/login')
  })

  it('should display an error message with invalid credentials', () => {
    cy.intercept('POST', '/api/login', (req) => {
      req.reply((res) => {
        res.send({ error: 'Invalid credentials' });
      });
    });

    cy.get('input[name="email"]').type('vshal');
    cy.get('input[name="password"]').type('admin');
    cy.get('input[type="submit"]').click();

    cy.get('.error-message').should('be.visible');
    cy.window().its('localStorage.token').should('be.undefined');
  });

  it('should log in successfully with valid credentials', () => {
    cy.intercept('POST', '/api/login', (req) => {
      const { email, password } = req.body;
      if (email === 'vshalofficial@gmail.com' && password === 'admin@123') {
        req.reply((res) => {
          res.send({ token: 'validtoken' });
        });
      } else {
        req.reply((res) => {
          res.send({ error: 'Invalid credentials' });
        });
      }
    });

    cy.get('input[name="email"]').type('vshalofficial@gmail.com');
    cy.get('input[name="password"]').type('admin@123');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/users');
    cy.window().its('sessionStorage.token').should('eq', 'validtoken');
  });


});