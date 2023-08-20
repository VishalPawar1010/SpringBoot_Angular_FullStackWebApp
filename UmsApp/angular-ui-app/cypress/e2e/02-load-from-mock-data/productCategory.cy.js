// describe('ProductCategoryMenuComponent', () => {
//     beforeEach(() => {
//       cy.visit('/login'); // Visit the login page
      
//       cy.get('input[name="email"]').type('vshalofficial@gmail.com');
//       cy.get('input[name="password"]').type('admin@123');
//       cy.get('input[type="submit"]').click();
//       cy.url().should('include', '/users');
//       cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProductCategories');
//       cy.visit('/products');
//     });
  
    // it('should display the product category menu', () => {
    //   cy.wait('@getProductCategories').then(() => {
    //     cy.get('..product-box').should('have.length', 1);
    //     cy.get('..product-box').first().should('contain', '');
    //   });
    // });
  
  //   it('should navigate to the products page when a product category is clicked', () => {
  //     cy.wait('@getProductCategories');
  //     cy.get('.list-group.navbar-list li').first().click();
  //     cy.url().should('include', '/category/1');
  //   });
  // });
  

  // });
  
  describe('Products', () => {
    beforeEach(() => {
      cy.visit('/login');
    
      cy.get('input[name="email"]').type('vshalofficial@gmail.com');
      cy.get('input[name="password"]').type('admin@123');
      cy.get('input[type="submit"]').click();
      cy.url().should('include', '/users');
    
      cy.intercept('GET', '/api/products', { fixture: 'productsData.json' }).as('getProducts');
      cy.visit('/products');
    });
  
    it('should load products data', () => {
      cy.wait('@getProducts').then(() => {
        cy.url().should('include', '/products');
        cy.get('.product-box').should('have.length.greaterThan', 0);
      });
    });
  });