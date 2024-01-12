describe('FinancialDetailsCard Component', () => {
    it('should render the component and navigate to updatefinancialdata page on button click', () => {
      // Visit your React app's URL or the page where the FinancialDetailsCard is rendered
      cy.visit('/your-page-url');
  
      // Check if the FinancialDetailsCard component is rendered
      cy.get('[data-testid="financial-details-card"]').should('exist');
  
      // Click the "Edit Details" button and check if the navigation occurs correctly
      cy.get('[data-testid="edit-details-button"]').click();
      cy.url().should('include', '/updatefinancialdata');
    });
  });
  