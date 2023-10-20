"use client";
import React from "react";
import LoginNavbar from "./LoginNavbar";
import Header from "./Header";
import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";

const Headers = () => {
  const pathname = usePathname();
  const { data } = useSession();
  // console.log(status);
  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        <LoginNavbar />
      ) : (
        <>
          <Header data={data} />
          <LoginNavbar />
        </>
      )}
    </>
  );
};

export default Headers;
