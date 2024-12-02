"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupAction } from "../lib/actions/signupActions";
import { signIn } from "next-auth/react";
export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    number: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const value=await SignupAction(formData);
 // Calls the server action directly
 if(value?.message){

  const signInResponse = await signIn("credentials", {
    redirect: false,
    phone:formData.number,
    password:formData.password, // Use the plain password to sign in after hashing
  });
console.log(signInResponse?.ok);
  if (!signInResponse?.ok) {
   
    throw new Error("Signup successful, but auto sign-in failed");
  }
  else{
    router.push("/dashboard");
   }
 }

 // Redirect after signup
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange}
          className="mb-6 p-2 w-full border rounded"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}
