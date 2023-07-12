"use client";
import React from "react";

import SnippetModal from "@/components/Modal";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

export default function HomeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <div className="w-full">
        <NavBar />
        {children}
        <SnippetModal />
      </div>
    </div>
  );
}
