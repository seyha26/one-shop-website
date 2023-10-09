"use client";
import React from "react";
import LoginNavbar from "./LoginNavbar";
import Header from "./Header";
import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";

const Headers = () => {
  const pathname = usePathname();
  const { status } = useSession();
  console.log(status);
  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        <LoginNavbar />
      ) : (
        <>
          <Header data={status} />
          <LoginNavbar />
        </>
      )}
    </>
  );
};

export default Headers;
