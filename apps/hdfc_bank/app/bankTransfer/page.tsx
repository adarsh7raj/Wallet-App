"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { user_check } from "../lib/actions";

const NetBankingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use `useSearchParams` hook
  const token = searchParams.get("token")||"jswjnj";
  const userId = searchParams.get("userId")||"7";
  const amount = searchParams.get("amount")||"100";

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  console.log('query params:',{token,userId,amount})
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">
          Welcome to HDFC Net Banking
        </h1>
        <p className="text-center text-sm mt-2">
          Secure. Fast. Reliable Banking Solutions.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center py-10 px-4">
        {/* Hero Section */}
        <section className="max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Why Choose HDFC Net Banking?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Experience the convenience of managing your finances from anywhere,
            at any time. With HDFC Net Banking, you can transfer funds, view
            account details, pay bills, and more—all securely and effortlessly.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>✔️ Quick and hassle-free money transfers</li>
            <li>✔️ 24/7 access to your accounts</li>
            <li>✔️ Advanced encryption for maximum security</li>
            <li>✔️ Easy bill payments and financial tracking</li>
          </ul>
        </section>

        {/* Login Form */}
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Login to Your Account
          </h2>
         
          
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="mt-1 block w-full px-3 py-2 border text-blue-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your Phone Number"
                
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 text-blue-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={async function(){
                if(token&&userId&&amount){
                  try{
                    
                    const response =await  user_check({token,userId,amount,password,phoneNumber});
                    if(response)
                    window.alert(response);
                  if(response==="Money transferred successfully"){
                    window.location.href="http://localhost:3001/transfer";
                  }
                   
                  }
                  catch(e){
                    console.log(e)
                    window.alert("A internal server error occured");
                  }
                }
              }}
            >
              Send Money
            </button>
      
        </div>

        {/* Footer Section */}
        <section className="max-w-4xl mt-8 text-center">
          <h3 className="text-xl font-semibold text-blue-600">
            Your Security is Our Priority
          </h3>
          <p className="text-gray-600 mt-2">
            HDFC Net Banking ensures the highest standards of security. Always
            verify the URL before entering your credentials. Do not share your
            password with anyone.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <p className="text-center text-sm">© 2024 HDFC Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NetBankingPage;
