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

  export async function getTipsByUserId(userId: string): Promise<Message[]> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          userId: userId
        }
      });
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  export async function deleteMessage(messageId: string): Promise<void> {
    try {
      await prisma.message.delete({
        where: {
          id: messageId
        }
      });
      console.log('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }