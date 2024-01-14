"use client";
import FormInput from "@/components/atoms/FormInput";
import SignUp from "@/components/organisms/SignUp";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome to HomyGig</h1>
      <SignUp />
    </main>
  );
}
