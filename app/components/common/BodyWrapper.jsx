"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function BodyWrapper({ children, inter }) {
  const isSearching = useSelector((state) => state.products.isSearching);
  return (
    <body
      className={inter}
      style={{
        overflow: isSearching ? "hidden" : "auto",
        position: "relative",
      }}
    >
      {children}
    </body>
  );
}
