"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

import db from "@repo/db/client";
import { redirect } from "next/dist/server/api-utils";

export async function SignupAction({
  email,
  name,
  password,
  number,
}: {
  email: string;
  name: string;
  password: string;
  number: string;
}) {
  if (!email || !name || !password || !number) {
    throw new Error("All fields are required");
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        number,
        Balance:{create:{amount:0,locked:0}}
      },
    });
const hdfc_bank=await db.bank_Balance.create({
  data:{userId:user.id,balance:Math.floor(Math.random()*100+100000),name:user.name||""}
})
    // Auto sign-in after signup
 
 
    // redirect("/dashboard"); // Revalidate if needed
if(user){
  return { message: true,user_detail:user };
}
 
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}
