"use client";

import Header from "@/shared/components/Header";
import { useEffect } from "react";
import testLogin from "./(api)/testLogin";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    testLogin()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
