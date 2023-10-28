import React from "react";

import { BiSearchAlt2 } from "react-icons/bi";

import useInputStore from "@/store/useUtils";

export default function SearchInput() {

  const input = useInputStore((state) => state.input);
  const handleInput = useInputStore((state) => state.handleInput);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(e.target.value);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <BiSearchAlt2 color="gray" size={22} />
      </div>
      <input
        required
        type="search"
        value={input}
        onChange={onChangeText}
        placeholder="Search snippets"
        className="block w-full rounded-lg border border-gray-100 bg-gray-100 p-3 pl-10 text-sm text-gray-900"
      />
    </div>
  );
}
