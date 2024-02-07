"use client";
import FormInput from "@/components/atoms/FormInput";
import NavBar from "@/components/organisms/NavBar";
import SignUp from "@/components/organisms/SignUp";
import Image from "next/image";

import useUserStore from "@/store/userStore";

export default function Home() {
  const { user } = useUserStore();
  return (
    <main className="flex flex-col  ">
      <NavBar />
      {/* <SignUp /> */}
      <h2>{user.name}</h2>
    </main>
  );
}
