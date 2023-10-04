"use client";
import React from "react";

import { toast } from "react-toastify";
import { BiFilterAlt, BiSortDown } from "react-icons/bi";

import SnippetsContainer from "@/components/SnippetsContainer";

export default function Snippets() {
  const handleFilter = () => {
    toast("Not Implemented yet", {
      autoClose: 3000,
      type: "info",
      position: "top-center",
    });
  };

  const handleSort = () => {
    toast("Not Implemented yet", {
      autoClose: 3000,
      type: "info",
      position: "top-center",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold text-slate-600">My snippets</h2>
          <p className="text-sm font-normal text-slate-400">
            You can edit as you wish
          </p>
        </div>
        {/* filter & sort options */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleFilter}
            className="flex cursor-pointer items-center space-x-1 rounded-md bg-[#e6e6e6] px-2 py-1"
          >
            <span className="text-sm font-normal text-slate-700">Filter</span>
            <BiFilterAlt size={14} color="black" />
          </button>
          <button
            onClick={handleSort}
            className="flex cursor-pointer items-center space-x-1 rounded-md bg-[#e6e6e6] px-2 py-1"
          >
            <span className="text-sm font-normal text-slate-700">Sort by</span>
            <BiSortDown size={14} color="black" />
          </button>
        </div>
      </div>
      {/* Snippets */}
      <SnippetsContainer />
    </div>
  );
}
