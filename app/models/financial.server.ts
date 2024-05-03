import type { User, FinancialDetails } from "@prisma/client";

import { prisma } from "~/db.server";

export function addFinancialDetails({
  balance,
  income,
  savings,
  userId,
}: Pick<FinancialDetails, "balance" | "income" | "savings"> & {
  userId: User["id"];
}) {
  return prisma.financialDetails.create({
    data: {
      balance,
      income,
      savings,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function editFinancialDetails({
  userId,
  balance,
  income,
  savings,
}: Pick<FinancialDetails, "balance" | "income" | "savings"> & {
  userId: User["id"];
}) {
  return prisma.financialDetails.update({
    where: {
      userId,
    },
    data: {
      balance,
      income,
      savings,
    },
  });
}

export async function updateBalance({
  userId,
  amount,
}: {
  userId: User["id"];
  amount: number;
}) {
  
  const financialDetails = await prisma.financialDetails.findUnique({
    where: { userId },
    select: { balance: true }
  });

  if (!financialDetails) {
    throw new Error("User not found or balance not set");
  }

  const newBalance = financialDetails.balance - amount;

  return prisma.financialDetails.update({
    where: {
      userId,
    },
    data: {
      balance: newBalance,
    },
  });
}


export function getFinancialDetails({ userId }: { userId: User["id"] }) {
  return prisma.financialDetails.findFirst({
    where: { userId },
  });
}
