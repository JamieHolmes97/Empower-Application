import {
    createBudget,
    createCategory,
    createExpense,
    getCategoriesByBudgetId,
    getAllExpenses,
    deleteBudgetById,
    deleteUserByEmailAllData,
    getUserBudgets,
    getAllExpensesByUser
  } from "../app/models/budget.server";
  import { createUser, deleteUserByEmail } from "../app/models/user.server";
  import { PrismaClient } from "@prisma/client";
  
  const prisma = new PrismaClient();
  
  describe("Expense functionality", () => {
    let userId;
    let budgetId;
    let categoryId;
    let expenseId;
  
    beforeAll(async () => {
      const email = "test@example.com";
      const password = "password123";
      const user = await createUser(email, password);
      userId = user.id;
  
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
  
      const categoryName = "Food";
      const categoryAmount = 500;
      const category = await createCategory({
        name: categoryName,
        amount: categoryAmount,
        budgetId,
      });
      categoryId = category.id;
    });
  
    afterAll(async () => {
      await deleteUserByEmail("test@example.com");
    });
  
    it("should add an expense to a budget", async () => {
      const description = "Lunch";
      const amount = 20;
  
      const expense = await createExpense({
        description,
        amount,
        categoryId,
        budgetId,
      });
      expenseId = expense.id;
  
      expect(expense).toBeDefined();
      expect(expense.description).toBe(description);
      expect(expense.amount).toBe(amount);
  
      const expenses = await getAllExpensesByUser(userId);
      expect(expenses.length).toBe(1);
    });
  
    it("should get categories by budget ID and have expenses", async () => {
      const categories = await getCategoriesByBudgetId(budgetId);
      expect(categories.length).toBe(1);
      expect(categories[0].expenses.length).toBe(1);
    });
  
    it("should delete the expense", async () => {
      await prisma.expense.delete({
        where: {
          id: expenseId,
        },
      });
  
      const expenses = await getAllExpenses();
      expect(expenses.length).toBe(0);
    });
  });
  