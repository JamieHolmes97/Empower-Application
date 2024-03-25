import {
    createBudget,
    createCategory,
    getCategoriesByBudgetId,
    deleteBudgetById,
  } from"../app/models/budget.server";
  import { createUser, deleteUserByEmail } from "../app/models/user.server"; 
  
  describe("Budget functionality", () => {
    let userId
    let budgetId
  
    beforeAll(async () => {
      const email = "test@example.com";
      const password = "password123";
      const user = await createUser(email, password);
      userId = user.id;
    });
  
    afterAll(async () => {
      await deleteUserByEmail("test@example.com");
    });
  
    it("should create a new budget with categories", async () => {
      const budgetName = "Test Budget";
      const totalAmount = 1000;
      const duration = 20;
  
      const budget = await createBudget({
        name: budgetName,
        totalAmount,
        duration,
        userId,
      });
      budgetId = budget.id;
  
      expect(budget).toBeDefined();
      expect(budget.name).toBe(budgetName);
  
      const categories = ["Food", "Transport", "Entertainment"];
      const categoryAmounts = [300, 200, 500];
      for (let i = 0; i < categories.length; i++) {
        const category = await createCategory({
          name: categories[i],
          amount: categoryAmounts[i],
          budgetId,
        });
        expect(category).toBeDefined();
        expect(category.name).toBe(categories[i]);
      }
    });
  
    it("should get categories by budget ID", async () => {
      const categories = await getCategoriesByBudgetId(budgetId);
      expect(categories.length).toBe(3);
    });
  
    it("should delete the budget", async () => {
      await deleteBudgetById(budgetId);
      const categories = await getCategoriesByBudgetId(budgetId);
      expect(categories.length).toBe(0);
    });
  });
  