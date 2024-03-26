import { prisma } from "../db.server";
import { Message, User } from "@prisma/client";

export function createTip({
    name,
    university,
    message,
    userId,
  }: Pick<Message, "name" | "university" | "message"> & {
    userId: User["id"];
  }) {
    return prisma.message.create({
      data: {
        name,
        university,
        message,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  export async function getAllTips(): Promise<Message[]> {
    return prisma.message.findMany();
  }