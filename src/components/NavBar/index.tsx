import React from "react";
import Image from "next/image";

import { HiLogout } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import Dropdown from "../Dropdown";
import SearchInput from "../SearchInput";
import useModalStore from "@/store/useModalStore";
import useAuthStore from "@/store/useAuthStore";

export default function NavBar() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const setMode = useModalStore((state) => state.setMode);
  const setVisible = useModalStore((state) => state.setVisible);

  const onSignOutClick = async () => {
    const answer = window.confirm("Are you sure you want to logout?");
    if (!answer) return;
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
        {/* <div className="rounded-md bg-slate-100 p-2">
          <IoNotifications color="gray" size={20} />
        </div> */}
        {/* profile dropdown menu */}
        <Dropdown
          headerTitle={user?.displayName ?? "Unkown User"}
          headerSubTitle={user?.email ?? "Unkown Email"}
          triggerComponent={
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
          }
          dropdownOptions={[
            {
              title: "Sign out",
              onClick: onSignOutClick,
              icon: <HiLogout color="#fa5c5c" />,
            },
          ]}
        />
      </div>
    </nav>
  );
}
