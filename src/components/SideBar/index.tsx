import React from "react";
import Section from "./components/Section";

export default function SideBar() {
  return (
    <div className="relative flex min-h-screen w-1/6 flex-col items-center border-r border-slate-100 bg-white py-6">
      {/* webapp name */}
      <div className="flex items-center space-x-1 rounded-md bg-[#304DFF] px-4 py-1">
        <span className="text-xl font-semibold text-slate-100">CodeHub</span>
      </div>
      {/* sections */}
      <div className="mt-16 flex w-full flex-col items-center space-y-3">
        <Section
          path="/snippets"
          sectionTitle="My Snippets"
          sectionIconName="snippets"
        />
      </div>
      {/* status */}
      <div className="absolute bottom-10">
        <div className="flex space-x-2 items-center">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
          </span>
          <span className="text-sm font-medium text-black/75">
            Work in progress
          </span>
        </div>
      </div>
    </div>
  );
}
