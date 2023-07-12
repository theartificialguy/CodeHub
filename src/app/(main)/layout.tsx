import React from "react";
import HomeWrapper from "@/hoc/home";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeWrapper>{children}</HomeWrapper>;
}
