import FormInput from "@/components/atoms/FormInput";
import NavBar from "@/components/organisms/NavBar";
import SignUp from "@/components/organisms/SignUp";
import Image from "next/image";

import useUserStore from "@/store/userStore";

export default function Home() {
  return (
    <main className="flex flex-col  ">
      <NavBar onDashBoard={false} />
      {/* <SignUp /> */}
    </main>
  );
}
