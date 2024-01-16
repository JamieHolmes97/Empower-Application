import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  beforeEach(() => {
    cy.viewport(1280, 800);
  });

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

    cy.findByRole("textbox", { name: /balance/i }).type(
      String(numericValues.balance),
    );
    cy.findByRole("textbox", { name: /income/i }).type(
      String(numericValues.income),
    );
    cy.findByRole("textbox", { name: /savings/i }).type(
      String(numericValues.savings),
    );

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(`Balance: ${numericValues.balance}`);
    cy.findByText(`Income: ${numericValues.income}`);
    cy.findByText(`Savings: ${numericValues.savings}`);

    cy.findByRole("button", { name: /edit details/i }).click();

    cy.findByRole("textbox", { name: /balance/i })
      .clear()
      .type(String(numericValuesChange.balance));

    cy.findByRole("textbox", { name: /income/i })
      .clear()
      .type(String(numericValuesChange.income));

    cy.findByRole("textbox", { name: /savings/i })
      .clear()
      .type(String(numericValuesChange.savings));

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(`Balance: ${numericValuesChange.balance}`);
    cy.findByText(`Income: ${numericValuesChange.income}`);
    cy.findByText(`Savings: ${numericValuesChange.savings}`);
  });
});
