import React from "react";
import Section from "./components/Section";

export default function SideBar() {
  return (
    <div className="flex min-h-screen w-1/6 flex-col items-center border-r border-slate-100 bg-white py-6">
      {/* webapp name */}
      <div className="flex items-center space-x-1 rounded-md bg-[#304DFF] px-4 py-1">
        <span className="text-xl font-semibold text-slate-100">CodeHub</span>
      </div>
      {/* sections */}
      <div className="mt-16 flex w-full flex-col items-center space-y-3">
        <Section path="/home" sectionTitle="Overview" sectionIconName="home" />
        <Section
          path="/snippets"
          sectionTitle="My Snippets"
          sectionIconName="snippets"
        />
      </div>
    </div>
  );
}
