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

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("link", { name: /notes/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });

  it("should allow you to make a note", () => {
    const testNote = {
      title: faker.lorem.words(1),
      body: faker.lorem.sentences(1),
    };
    const numericValues = {
      balance: 1000,
      income: 5000,
      savings: 2000,
    };

    const numericValuesChange = {
      balance: 3000,
      income: 2000,
      savings: 4500
    }

    cy.login();

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /notes/i }).click();
    cy.findByText("No notes yet");

    cy.findByRole("link", { name: /\+ new note/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    cy.findByRole("textbox", { name: /body/i }).type(testNote.body);

    cy.findByRole("textbox", { name: /balance/i }).type(
      String(numericValues.balance),
    );
    cy.findByRole("textbox", { name: /income/i }).type(
      String(numericValues.income),
    );
    cy.findByRole("textbox", { name: /savings/i }).type(
      String(numericValues.savings),
    );

    cy.findByRole("button", { name: /save/i }).click();

    cy.findByText(testNote.title);
    cy.findByText(testNote.body);

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText("No notes yet");

    cy.visit("/dashboard");

    cy.findByText(`Balance: ${numericValues.balance}`);
    cy.findByText(`Income: ${numericValues.income}`);
    cy.findByText(`Savings: ${numericValues.savings}`);

    cy.visit("/updatefinancialdata");

    cy.findByRole("textbox", { name: /balance/i }).clear().type(
      String(numericValuesChange.balance),
    );

    cy.findByRole("textbox", { name: /income/i }).clear().type(
      String(numericValuesChange.income),
    );

    cy.findByRole("textbox", { name: /savings/i }).clear().type(
      String(numericValuesChange.savings),
    );

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(`Balance: ${numericValuesChange.balance}`);
    cy.findByText(`Income: ${numericValuesChange.income}`);
    cy.findByText(`Savings: ${numericValuesChange.savings}`);
  });
});
