"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { redirect, useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
 console.log(session);
  return (
   <div>
      <Appbar onSignin={async function(){
        await signIn("Credentials",{redirect:true,callbackUrl:"/dashboard"});
    
      }} onSignout={async function()  {
    await signOut({redirect:true,callbackUrl:"/landing"});
    
        
      }} user={session.data?.user} />
   </div>
  );
}
