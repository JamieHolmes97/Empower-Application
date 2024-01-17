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

export function getFinancialDetails({ userId }: { userId: User["id"] }) {
  return prisma.financialDetails.findFirst({
    where: { userId },
  });
}
