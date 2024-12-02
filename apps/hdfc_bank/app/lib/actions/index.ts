"use server"
import client from "@repo/db/client";
import axios from "axios";
import bcrypt from "bcrypt";
import { use } from "react";

interface User_data {
  token: string;
  userId: string;
  amount: string;
  phoneNumber: string;
  password: string;
}
interface WebhookPayload {
  token: string;
  amount: string
  userId: string 
  status: boolean;
}
async function sendWebhookWithRetry(payload:WebhookPayload, url:string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(url, payload, { headers: { "Content-Type": "application/json" } });
      break;
    } catch (error) {
      console.error("Webhook attempt failed:", error);
      if (i === retries - 1) throw error; // Throw error if retries exhausted
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
    }
  }
}

export async function user_check({
  token,
  userId,
  amount,
  phoneNumber,
  password,
}: User_data) {
  await client.$connect(); // Ensure Prisma is connected

  const data = await client.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!data || data.number !== phoneNumber) {
    const payload = {
      token: token,
      amount: amount,
      userId: userId,
      status: false,
    };
    await sendWebhookWithRetry(payload, "http://localhost:3003/hdfcWebhook");
    return "User not found or phone number mismatch";
  }

  const correct_password = await bcrypt.compare(password, data.password);
  if (!correct_password) {
    const payload = {
      token: token,
      amount: amount,
      userId: userId,
      status: false,
    };
    await sendWebhookWithRetry(payload, "http://localhost:3003/hdfcWebhook");
    return "Wrong password provided";
  }

  const current_balance = await client.bank_Balance.findUnique({
    where: { userId: Number(userId) },
  });

  if (!current_balance || current_balance.balance < Number(amount) / 100) {
    return "Insufficient balance";
  }

  try {

      const response=await client.bank_Balance.update({
        where: { userId: Number(userId) },
        data: { balance: { decrement: Number(amount) / 100 } },
      });

      const payload = {
        token: token,
        amount: amount,
        userId: userId,
        status: true,
      };
      if(response){
        await sendWebhookWithRetry(payload, "http://localhost:3003/hdfcWebhook");
        return "Money transferred successfully";
      }
    

   
  } catch (error) {
    console.error("Transaction failed:", error);
    return "Transaction failed";
  }
}








