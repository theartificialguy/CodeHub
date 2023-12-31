"use client";
import React from "react";

import { toast } from "react-toastify";
import { FiShare } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";

import dayjs from "@/utility/dayjs";
import useModalStore from "@/store/useModalStore";
import { deleteSnippet } from "@/firebase/functions";
import useAuthStore from "@/store/useAuthStore";
import { ISnippet } from "@/types";

export default function Snippet({
  id,
  extension,
  description,
  created_at,
  updated_at,
}: ISnippet) {
  const user = useAuthStore((state) => state.user);
  const { setMode, setVisible, setSelectedSnippetId } = useModalStore(
    (state) => state
  );

  const createShareableLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${location.hostname}/share/${id}` // add :3000 for dev
      );
      toast("Link Copied", {
        autoClose: 3000,
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onViewClicked = () => {
    setMode("view");
    setSelectedSnippetId(id);
    setVisible(true);
  };

  const onEditClicked = () => {
    setMode("edit");
    setSelectedSnippetId(id);
    setVisible(true);
  };

  const onDeleteClicked = async () => {
    if (!user) return;

    const answer = window.confirm(
      "Are you sure you want to delete this snippet?"
    );
    if (!answer) return;

    const res = await deleteSnippet(id);
    if (res) {
      toast("Snippet Deleted", {
        autoClose: 3000,
        type: "success",
        position: "top-center",
      });
    } else {
      toast("Something went wrong", {
        autoClose: 3000,
        type: "success",
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="
            h-56 m-2 flex w-96 transform flex-col justify-between rounded-lg border
            border-slate-200 bg-[#FFFFFF] p-2 shadow-sm md:h-60 md:w-64 lg:w-96
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
              title="View Snippet"
              onClick={onViewClicked}
              className="cursor-pointer rounded-full bg-[#e2ffeb] p-2"
            >
              <AiOutlineEye color="#32f56a" size={20} />
            </div>
            <div
              title="Edit Snippet"
              onClick={onEditClicked}
              className="cursor-pointer rounded-full bg-[#e2ebff] p-2"
            >
              <MdOutlineEdit color="#325ddd" size={20} />
            </div>
            <div
              title="Delete Snippet"
              onClick={onDeleteClicked}
              className="cursor-pointer rounded-full bg-[#ffe2e2] p-2"
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
            <span className="text-xs font-light text-slate-400">
              {/* @ts-ignore */}
              created {dayjs(created_at?.toDate()).fromNow()}
            </span>
            {updated_at && (
              <span className="text-xs font-light text-slate-400">
                {/* @ts-ignore */}• updated{" "}
                {dayjs(updated_at?.toDate()).fromNow()}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="mb-1 flex flex-row items-center justify-between px-4">
        <div className="rounded-full border bg-[#EEEEEE] px-3">
          <span className="text-sm font-normal text-slate-600">Public</span>
        </div>
        <div title="share" className="cursor-pointer" onClick={createShareableLink}>
          <FiShare color="#4f4d4d" size={20} />
        </div>
      </div>
    </div>
  );
}
