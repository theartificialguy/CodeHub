"use client";

import React from "react";

import { toast } from "react-toastify";
import { FiShare } from "react-icons/fi";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";

import useModalStore from "@/store/useModalStore";
import { deleteSnippet } from "@/firebase/functions";
import useAuthStore from "@/store/useAuthStore";

interface ISnippet {
  snippetId: string;
  extension: string;
  description: string;
}

export default function Snippet({
  extension,
  description,
  snippetId,
}: ISnippet) {
  const user = useAuthStore((state) => state.user);
  const { setMode, setVisible, setSelectedSnippetId } = useModalStore(
    (state) => state
  );

  const onEditClicked = () => {
    setMode("edit");
    setSelectedSnippetId(snippetId);
    setVisible(true);
  };

  const onDeleteClicked = async () => {
    if (!user) return;
    try {
      await deleteSnippet(user.uid, snippetId);
      toast("Snippet Deleted", {
        autoClose: 3000,
        type: "error",
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        autoClose: 3000,
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="
            h-54 m-2 flex w-4/5 transform flex-col justify-between
            rounded-lg bg-[#FFFFFF] p-2 shadow-sm md:h-60 md:w-64 lg:w-96
        "
    >
      <div className="space-y-3">
        {/* header */}
        <div className="flex flex-row items-center justify-between">
          <div className="rounded-full bg-[#e2ebff] px-3 py-1">
            <span className="text-center text-sm font-normal text-[#325ddd]">
              {extension}
            </span>
          </div>
          <div className="flex flex-row space-x-4">
            <div
              onClick={onEditClicked}
              className="cursor-pointer rounded-full bg-[#e2ebff] p-2"
            >
              <MdOutlineEdit color="#325ddd" size={20} />
            </div>
            <div
              onClick={onDeleteClicked}
              className="rounded-full bg-[#ffe2e2] p-2"
            >
              <MdOutlineDeleteForever color="#d33131" size={20} />
            </div>
          </div>
        </div>
        {/* description */}
        <div className="flex w-[95%] flex-col space-y-2 overflow-hidden px-2">
          <p className="line-clamp-4 text-base font-normal text-slate-800">
            {description}
          </p>
          <div className="flex flex-row items-center space-x-6">
            <span className="text-sm font-light text-slate-400">
              2 days ago
            </span>
            <span className="text-sm font-light text-slate-400">
              • updated just now
            </span>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="mb-1 flex flex-row items-center justify-between px-4">
        <div className="rounded-full border bg-[#EEEEEE] px-3">
          <span className="text-sm font-normal text-slate-600">Public</span>
        </div>
        <div>
          <FiShare color="#4f4d4d" size={20} />
        </div>
      </div>
    </div>
  );
}