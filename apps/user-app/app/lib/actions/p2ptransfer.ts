"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import {Prisma} from '@prisma/client/edge.js'
export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    console.log(from);
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    // Below we uesd Sequential transaction Use them when the result of one query depends on another
    // (e.g., checking a balance before transferring money) or when you need conditional logic between queries.
    // These transactions are sequential transaction they occur one after the other

    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) }, // 
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });
         await tx.p2pTransfer.create({data:{
            fromUserId:Number(from),
            toUserId:toUser.id,
            amount:amount/100,
            timestamp:new Date()
         }})
    });
}