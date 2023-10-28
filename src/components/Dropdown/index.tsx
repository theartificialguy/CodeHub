import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type DropdownOption = {
  title: string;
  icon?: React.ReactNode;
  onClick: () => Promise<void> | void;
};

interface Dropdown {
  triggerComponent?: React.ReactNode;
  headerTitle?: string;
  headerSubTitle?: string;
  dropdownOptions?: DropdownOption[];
}

const Dropdown = ({
  triggerComponent,
  headerTitle,
  headerSubTitle,
  dropdownOptions,
}: Dropdown) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* TRIGGER COMPONENT */}
      {/* <div className='p-3 flex justify-center items-center cursor-pointer' onClick={toggleDropdown}>
            <span className='text-base font-normal text-black/80'>{title ?? ''}</span>
        </div> */}
      <div className="flex" onClick={toggleDropdown}>
        {triggerComponent}
      </div>
      {/* DROPDOWN MENU */}
      <div
        className={twMerge(
          "absolute right-0 top-14 z-10 min-w-max flex-col space-y-2 rounded-md bg-[#fefefe] p-2 shadow-md",
          open ? "flex" : "hidden"
        )}
      >
        {headerTitle ? (
          <div className="flex flex-col items-start space-y-2 py-2">
            <h2 className="text-base font-medium text-black/80">
              {headerTitle}
            </h2>
            <p className="text-sm font-normal text-black/70">
              {headerSubTitle ?? ""}
            </p>
          </div>
        ) : null}

        {dropdownOptions ? (
          <>
            {dropdownOptions.map((option, index) => (
              <div
                key={index.toString()}
                onClick={option.onClick}
                className="flex w-full cursor-pointer items-center space-x-2 rounded px-1 py-2 hover:bg-slate-200"
              >
                {option.icon ? option.icon : null}
                <span className="text-sm font-normal text-black/80">
                  {option.title}
                </span>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
