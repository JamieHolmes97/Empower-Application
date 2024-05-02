import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  // afterEach(() => {
  //   cy.cleanupUser();
  // });

  // beforeEach(() => {
  //   cy.viewport(1280, 800);
  // });

  it("should allow you to register and login", () => {
    // cy.viewport('iphone-8') // Set viewport to 375px x 667px

    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    const numericValues = {
      balance: 344,
      income: 250,
      savings: 1200,
    };

    const numericValuesChange = {
      balance: 3000,
      income: 2000,
      savings: 4500,
    };

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("spinbutton", { name: /overall balance/i }).type(String(numericValues.balance));

    cy.findByRole("spinbutton", { name: /monthly income/i }).type(String(numericValues.income));

    cy.findByRole("spinbutton", { name: /current savings/i }).type(String(numericValues.savings));

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(`Balance: £${numericValues.balance}`);
    cy.findByText(`Monthly Income: £${numericValues.income}`);
    cy.findByText(`Savings: £${numericValues.savings}`);

    cy.findByRole("button", { name: /edit details/i }).click();

    cy.findByRole("spinbutton", { name: /overall balance/i })
      .clear()
      .type(String(numericValuesChange.balance));

    cy.findByRole("spinbutton", { name: /monthly income/i })
      .clear()
      .type(String(numericValuesChange.income));

    cy.findByRole("spinbutton", { name: /current savings/i })
      .clear()
      .type(String(numericValuesChange.savings));

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(`Balance: £${numericValuesChange.balance}`);
    cy.findByText(`Monthly Income: £${numericValuesChange.income}`);
    cy.findByText(`Savings: £${numericValuesChange.savings}`);

    cy.get('[data-testid="AddIcon"] > path').click();

    cy.findByRole("textbox", { name: /budget name/i }).type("testing");
    cy.findByRole("spinbutton", { name: /total budget amount/i }).type(String(500));
    cy.findByRole("spinbutton", { name: /budget duration in days/i }).type(String(30));
    cy.findByRole("button", { name: /next/i }).click();

    cy.get('#category').select('Housing');
    cy.findByRole("spinbutton", { name: /category amount/i }).type(String(250));
    cy.findByRole("button", { name: /add category/i }).click();

    cy.get('#category').select('Food');
    cy.findByRole("spinbutton", { name: /category amount/i }).clear().type(String(100));
    cy.findByRole("button", { name: /add category/i }).click();

    cy.get('#category').select('Clothing');
    cy.findByRole("spinbutton", { name: /category amount/i }).clear().type(String(50));
    cy.findByRole("button", { name: /add category/i }).click();

    cy.get('#category').select('Savings');
    cy.findByRole("spinbutton", { name: /category amount/i }).clear().type(String(50));
    cy.findByRole("button", { name: /add category/i }).click();

    cy.get('.text-center').click();











 



    
  
  });
});
