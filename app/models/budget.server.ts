import { prisma } from "../db.server";
import { Budget, Expense, Category, User } from "@prisma/client";

export function createBudget({
  name,
  totalAmount,
  duration,
  userId,
}: Pick<Budget, "name" | "totalAmount" | "duration"> & {
  userId: User["id"];
}) {
  return prisma.budget.create({
    data: {
      name,
      totalAmount,
      duration,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function createCategory({
  name,
  amount,
  amountUpdated,
  budgetId,
}: Pick<Category, "name" | "amount" | "amountUpdated"> & {
  budgetId: Budget["id"];
}) {
  return prisma.category.create({
    data: {
      name,
      amount,
      amountUpdated,
      budget: {
        connect: {
          id: budgetId,
        },
      },
    },
  });
}

export function deleteCategoryById(categoryId: Category['id']) {
  return prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
}


export function createExpense({
  description,
  amount,
  categoryId,
  budgetId,
}: Pick<Expense, "description" | "amount"> & {
  categoryId: Category["id"];
  budgetId: Budget["id"];
}) {
  return prisma.expense.create({
    data: {
      description,
      amount,
      category: {
        connect: {
          id: categoryId,
        },
      },
      budget: {
        connect: {
          id: budgetId,
        },
      },
    },
  });
}

export async function getUniqueBudgetIDAndUserID({
  id,
  userId,
}: Pick<Budget, "id"> & {
  userId: User["id"];
}) {
  return prisma.budget.findFirst({
    where: { id: id, userId },
  });
}

export function getUserBudgets({ userId }: { userId: User["id"] }) {
  return prisma.user
    .findUnique({
      where: { id: userId },
      include: {
        budgets: {
          include: {
            categories: true,
            expenses: true,
          },
        },
      },
    })
    .then((user) => user?.budgets || []);
}

export function getAllBudgets() {
  return prisma.budget.findMany({
    include: {
      categories: true,
      expenses: true,
    },
  });
}

export async function getCategoriesByBudgetId(budgetId: string): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    where: {
      budgetId: budgetId,
    },
  });
  
  return categories;
}

export async function deleteBudgetById(budgetId: Budget["id"]) {
  const existingBudget = await prisma.budget.findUnique({
    where: { id: budgetId },
  });

  if (!existingBudget) {
    throw new Error(`Budget with id ${budgetId} not found`);
  }

  await prisma.expense.deleteMany({
    where: { budgetId },
  });

  await prisma.category.deleteMany({
    where: { budgetId },
  });

  return prisma.budget.delete({
    where: { id: budgetId },
  });
}

export async function updateCategoryAmount(categoryId: Category["id"], newAmount: number) {
  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!existingCategory) {
    throw new Error(`Category with id ${categoryId} not found`);
  }

  return prisma.category.update({
    where: { id: categoryId },
    data: { amountUpdated: newAmount },
  });
}

export async function getAllExpenses(): Promise<Expense[]> {
  return prisma.expense.findMany();
}

export async function getAllExpensesByUser(userId: string): Promise<Expense[]> {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        budget: {
          user: {
            id: userId,
          },
        },
      },
    });
    return expenses;
  } catch (error) {
    console.error("Error fetching all expenses:", error);
    throw error;
  }
}

export async function deleteExpenseById(expenseId: Expense["id"]) {
  const existingExpense = await prisma.expense.findUnique({
    where: { id: expenseId },
  });

  if (!existingExpense) {
    throw new Error(`Expense with id ${expenseId} not found`);
  }

  return prisma.expense.delete({
    where: { id: expenseId },
  });
}

export async function findExpenseById(expenseId: string) {
  const expense = await prisma.expense.findUnique({
    where: { id: expenseId },
  });

  if (!expense) {
    throw new Error(`Expense with id ${expenseId} not found`);
  }

  return expense;
}



