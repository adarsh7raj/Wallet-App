"use server"
import client from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth"; 

interface data{
    amount:number|undefined,
    providerName:string,

}
export async function  handleAddMoney ({amount,providerName}:data)  {
    const session = await getServerSession(authOptions);
    console.log(amount,providerName);
    if (!session) {
      console.error("No session found");
      return;
    }

    if (typeof amount === "number" && amount > 0) {
      try {
        const user_id=Number(session.user.id);
        // Create ramp transaction
        await client.onRampTransaction.create({
          data: {
            startTime: new Date(),
            status: "Processing",
            userId: user_id,
            amount: amount,
            provider: providerName,
            token: Math.random().toString(),
          },
        });

        // Redirect to the selected bank's URL
        
      } catch (error) {
        console.error("Error creating transaction:", error);
      }
    } else {
      console.error("Invalid amount");
    }
  };

