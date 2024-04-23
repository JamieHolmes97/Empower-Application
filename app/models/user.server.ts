import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

// import { prisma } from "~/db.server";
import { prisma } from "../db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function deleteUserByEmailAllData(email: string): Promise<void> {

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      financialDetails: true,
      budgets: {
        include: {
          categories: true,
          expenses: true,
        },
      },
      messages: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.financialDetails) {
    await prisma.financialDetails.delete({
      where: {
        userId: user.id,
      },
    });
  }

  for (const budget of user.budgets) {
    for (const category of budget.categories) {
      await prisma.expense.deleteMany({
        where: {
          categoryId: category.id,
        },
      });
    }

    await prisma.category.deleteMany({
      where: {
        budgetId: budget.id,
      },
    });

    await prisma.budget.delete({
      where: {
        id: budget.id,
      },
    });
  }

  await prisma.message.deleteMany({
    where: {
      userId: user.id,
    }
  })

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}


