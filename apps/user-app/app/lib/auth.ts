import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.number
                    }
                }
                return null;
            }

           
            
            
         

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
       
        async session({ token, session }: any) {
            session.user.id = token.sub
console.log(session);
            return session
        },
        async redirect({ url, baseUrl }:{ url: string; baseUrl: string }) {
            // If it's a successful sign-in, redirect to /dashboard
            if(url==="/dashboard"){
                console.log(url);
                return  `${baseUrl}/dashboard`;
            }
            if(url==="/landing"){
                console.log(url);
                return `${baseUrl}/landing`
            }
          return `${baseUrl}/dashboard`
          },
    }
  }
