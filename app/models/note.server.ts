import type { User, Note, FinancialDetails } from "@prisma/client";

import { prisma } from "~/db.server";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

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

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
