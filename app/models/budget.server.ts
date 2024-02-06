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
