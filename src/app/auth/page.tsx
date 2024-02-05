"use client";
import RoundedBTN from "@/components/atoms/RoundedBTN";
import Login from "@/components/organisms/Login";
import SignUp from "@/components/organisms/SignUp";
import React, { useState } from "react";

const Auth = () => {
  const [onCreateAccount, setOnCreateAccount] = useState(true);
  return (
    <div className="flex justify-center items-center mobile:max-sm:bg-white bg-bgGray h-screen w-screen">
      <div className="h-[70vh] w-[60vw] mobile:max-sm:w-[95vw] shadow-md mobile:max-sm:shadow-none bg-white flex ">
        <div className="form flex justify-center items-center flex-col w-[30vw] mobile:max-sm:w-[100vw]  py-10">
          {onCreateAccount ? <SignUp /> : <Login />}

          <p>
            {onCreateAccount
              ? "Already have an Account?"
              : "Dont have an Account?"}{" "}
            <button
              onClick={() => setOnCreateAccount((prev) => !prev)}
              className="text-primarytheme font-bold"
            >
              {" "}
              {onCreateAccount ? "login" : "sign up"}
            </button>
          </p>
        </div>
        <div className="text mobile:max-sm:hidden w-[30vw] h-full bg-primarytheme flex justify-center items-center text-center px-[18px]">
          <div className="textcontent">
            <h3 className="text-[30px] font-bold mb-2">
              {" "}
              {onCreateAccount ? "Welcome, Back" : "Hello, Friend"}
            </h3>
            <p className="mb-2">
              {onCreateAccount
                ? "we are glad to see you return, login in and continiour from we you left"
                : "Fill up the information and start journey with us"}
            </p>
            <RoundedBTN
              text={onCreateAccount ? "Login" : "SignUp"}
              className={"text-white"}
              onClick={() => setOnCreateAccount((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
