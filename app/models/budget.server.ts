import { prisma } from "~/db.server";
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
  budgetId,
}: Pick<Category, "name" | "amount"> & {
  budgetId: Budget["id"];
}) {
  return prisma.category.create({
    data: {
      name,
      amount,
      budget: {
        connect: {
          id: budgetId,
        },
      },
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


