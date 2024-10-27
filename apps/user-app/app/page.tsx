import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    console.log(session?.user);
    redirect("/dashboard")

  } else {
  console.log("Hi from else");
    redirect('/landing')
  }
}
