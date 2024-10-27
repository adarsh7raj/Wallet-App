"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
export  function AuthButtons() {
    return (
        <div className="space-x-4">
            <button  onClick={function(){
                signIn();
            }} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sign In</button>
           <Link href={"/signup"}> <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</button></Link>
        </div>
    );
}
