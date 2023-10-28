"use client";
import React from "react";

import { toast } from "react-toastify";
// import { BiFilterAlt, BiSortDown } from "react-icons/bi";

import SnippetsContainer from "@/components/SnippetsContainer";
import useUtils from "@/store/useUtils";
import { SORT_TYPES } from "@/types";

export default function Snippets() {
  const sortBy = useUtils((state) => state.sortBy);
  const handleSortBy = useUtils((state) => state.handleSortBy);

  const handleFilter = () => {
    toast("Not Implemented yet", {
      autoClose: 3000,
      type: "info",
      position: "top-center",
    });
  };

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSortBy(e.target.value as SORT_TYPES);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold text-slate-600">My snippets</h2>
          <p className="text-sm font-normal text-slate-400">
            You can edit as you wish
          </p>
        </div>
        {/* filter & sort options */}
        <div className="flex items-center space-x-4">
          {/* <span>sort</span>
          <span>filter</span> */}
        </div>
        {/* <div className="flex items-center space-x-4">
          <button
            onClick={handleFilter}
            className="flex cursor-pointer items-center space-x-1 rounded-md bg-[#f0f0f0] px-2 py-1"
          >
            <span className="text-sm font-normal text-slate-600">Filter</span>
            <BiFilterAlt size={14} color="gray" />
          </button>
          <div>
            <Dropdown
              label
              renderTrigger={() => (
                <div className="flex cursor-pointer items-center space-x-1 rounded-md bg-[#f0f0f0] px-2 py-1">
                  <span className="text-sm font-normal text-slate-600">
                    Sort by
                  </span>
                  <BiSortDown size={14} color="gray" />
                </div>
              )}
            >
              <Dropdown.Item icon={undefined}>Created At</Dropdown.Item>
              <Dropdown.Item icon={undefined}>
                <div className="flex items-center space-x-2">
                  <div className="space-x-2">
                    <input
                      type="radio"
                      className="h-3 w-3"
                      name="ca-sort"
                      value={"CA-ASC"}
                      onChange={handleSort}
                      checked={sortBy === "CA-ASC"}
                    />
                    <span className="text-xs font-normal text-slate-600">
                      Asc
                    </span>
                  </div>
                  <div className="items-center space-x-2">
                    <input
                      type="radio"
                      className="h-3 w-3"
                      name="ca-sort"
                      value={"CA-DESC"}
                      onChange={handleSort}
                      checked={sortBy === "CA-DESC"}
                    />
                    <span className="text-xs font-normal text-slate-600">
                      Desc
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item icon={undefined}>Updated At</Dropdown.Item>
              <Dropdown.Item icon={undefined}>
                <div className="flex items-center space-x-2">
                  <div className="space-x-2">
                    <input
                      type="radio"
                      className="h-3 w-3"
                      name="ua-sort"
                      value={"UA-ASC"}
                      onChange={handleSort}
                      checked={sortBy === "UA-ASC"}
                    />
                    <span className="text-xs font-normal text-slate-600">
                      Asc
                    </span>
                  </div>
                  <div className="items-center space-x-2">
                    <input
                      type="radio"
                      className="h-3 w-3"
                      name="ua-sort"
                      value={"UA-DESC"}
                      onChange={handleSort}
                      checked={sortBy === "UA-DESC"}
                    />
                    <span className="text-xs font-normal text-slate-600">
                      Desc
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div> */}
      </div>
      {/* Snippets */}
      <SnippetsContainer />
    </div>
  );
}
