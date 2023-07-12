"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { BiHomeAlt, BiCode } from "react-icons/bi";

const ICONS = {
  home: {
    base: <BiHomeAlt size={20} color="#7f8183" />,
    selected: <BiHomeAlt size={20} color="#304DFF" />,
  },
  snippets: {
    base: <BiCode size={20} color="#7f8183" />,
    selected: <BiCode size={20} color="#304DFF" />,
  },
};

interface SectionProps {
  path: string;
  sectionTitle: string;
  sectionIconName: string;
}

const Section = ({ sectionTitle, sectionIconName, path }: SectionProps) => {
  const router = useRouter();
  const pathname = usePathname(); // "/home", "/snippets"
  const isSelected = pathname === path;

  const onNavigate = () => {
    router.push(path);
  };

  return (
    <div
      onClick={onNavigate}
      className={`flex w-[90%] group cursor-pointer items-center justify-between rounded-md p-2 hover:bg-[#e4edff] ${
        isSelected ? "bg-[#e4edff]" : "bg-white"
      }`}
    >
      <div className="flex items-center space-x-2">
        {sectionIconName === "home" &&
          (isSelected ? ICONS.home.selected : ICONS.home.base)}
        {sectionIconName === "snippets" &&
          (isSelected ? ICONS.snippets.selected : ICONS.snippets.base)}
        <span
          className={`text-sm font-medium group-hover:text-[#304DFF] ${
            isSelected ? "text-[#304DFF]" : "text-slate-600"
          }`}
        >
          {sectionTitle}
        </span>
      </div>
    </div>
  );
};

export default Section;
