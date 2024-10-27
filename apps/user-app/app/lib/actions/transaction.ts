"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
 export async function Senttransactions(){
    const handler= await getServerSession(authOptions);
    
const from=handler.user.id
        const Sent_transactions=await prisma.p2pTransfer.findMany({where:{fromUserId:Number(from)},select:{timestamp:true,toUserId:true,amount:true,toUser:{select:{number:true}}}})
            // console.log(transactions)
        return Sent_transactions
    }
    export async function Receivedtransactions(){
        const handler= await getServerSession(authOptions);
        
    const from=handler.user.id
            const received_transactions=await prisma.p2pTransfer.findMany({where:{toUserId:Number(from)},select:{timestamp:true,fromUserId:true,amount:true,toUser:{select:{number:true}}}})
                // console.log(transactions)
            return received_transactions
        }