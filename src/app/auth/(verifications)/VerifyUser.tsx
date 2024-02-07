"use client";
import useUserStore from "@/store/userStore";
import { decodeToken } from "@/utils/jwtDecode";

import React, { useEffect } from "react";

const VerifyUser = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUserStore();
  const token = localStorage?.getItem("token");

  useEffect(() => {
    if (token) setUser(decodeToken(token));
  }, []);

  return <>{children}</>;
};

export default VerifyUser;

// VerifyUser is a component that wraps the whole application,
// Checks for token in the localstage
// decodes the token and updates the store with user data
