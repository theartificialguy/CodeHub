"use client";
import React from "react";
import Image from "next/image";

import { Dropdown } from "flowbite-react";
import { IoNotifications } from "react-icons/io5";
import { HiCog, HiLogout, HiViewGrid } from "react-icons/hi";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import SearchInput from "../SearchInput";
import useModalStore from "@/store/useModalStore";
import useAuthStore from "@/store/useAuthStore";

export default function NavBar() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const setMode = useModalStore((state) => state.setMode);
  const setVisible = useModalStore((state) => state.setVisible);

  const onSignOutClick = async () => {
    await signOut();
  };

  return (
    <nav className="flex h-20 items-center justify-between border-b border-slate-100 bg-white px-12">
      <SearchInput />
      <div className="flex items-center space-x-4">
        {/* add new snippet button */}
        <button
          onClick={() => {
            setMode("create");
            setVisible(true);
          }}
          className="
            flex items-center justify-center space-x-2 rounded-md border border-blue-600 bg-[#304DFF] p-2 text-sm font-normal text-slate-50
              hover:border hover:border-gray-800 hover:bg-[#eeee] hover:text-slate-700
            "
        >
          <MdOutlineAddCircleOutline />
          <span>Add new snippet</span>
        </button>
        {/* notification icon */}
        <div className="rounded-md bg-slate-100 p-2">
          <IoNotifications color="gray" size={20} />
        </div>
        {/* profile dropdown menu */}
        <div>
          <Dropdown
            label
            renderTrigger={() => (
              <Image
                width={40}
                height={40}
                quality={80}
                alt="user profile image"
                className="cursor-pointer rounded-full"
                onError={(e) => console.log("failed")}
                src={
                  user?.photoURL ??
                  "https://api.dicebear.com/6.x/pixel-art/png?seed=Jane&flip=true"
                }
              />
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {user?.displayName ?? "Unkown User"}
              </span>
              <span className="block truncate text-sm font-medium">
                {user?.email ?? "Unkown Email"}
              </span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
            <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={onSignOutClick}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
