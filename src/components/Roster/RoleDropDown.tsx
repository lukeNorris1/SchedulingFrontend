import React, { useEffect, useRef, useState } from "react";
import { ROLES } from "../../types/User";

interface DropdownProps {
  selectedRole: any;
  setRole: (value: number) => void;
  filter?: string;
}

export default function RoleDropDown({
  selectedRole,
  setRole,
  filter,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<"up" | "down">("down");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleContentUpdate = (newContent: number) => {
    setRole(newContent);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleWindowResize() {
      determineOpenDirection();
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    determineOpenDirection();
  }, [isOpen]);

  function determineOpenDirection() {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (dropdownRect.bottom + 200 > windowHeight) {
        setOpenDirection("up");
      } else {
        setOpenDirection("down");
      }
    }
  }

  const findRoleByKey = (value: number): string | undefined => {
    const foundRole = Object.entries(ROLES).find(([_, val]) => val === value);
    return foundRole ? foundRole[0] : undefined;
  };

  return (
    <div
      className="flex justify-center items-center gap-2 w-full"
      ref={dropdownRef}
    >
      <div className="relative">
        <div className="absolute left-2 -top-[0.5em] px-[2px] bg-slate-800 leading-none text-sm select-none">
          {"Role"}
        </div>
        <button
          type="button"
          className={`py-2 pl-2 h-12 rounded-md shadow-sm bg-slate-800 border-2 border-gray-600 ${
            isOpen && "!border-white"
          } transition ease-in-out delay-100 hover:border-white text-white font-medium focus:outline-none`}
          onClick={toggleDropdown}
        >
          {
            <span className="inline-block flex items-center h-6 w-28">
              <span className="truncate">
                {selectedRole !== undefined ? findRoleByKey(selectedRole) : ""}
              </span>
            </span>
          }
        </button>
        {isOpen && ROLES ? (
          <div
            className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg ${
              openDirection === "down" ? "top-full" : "bottom-full mb-4"
            }`}
          >
            <ul className="py-1">
              {filter
                ? Object.entries(ROLES)
                    .filter((role) => role[0] != filter)
                    .map(([key, val], index: number) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer text-black text-sm text-start hover:bg-blue-500 hover:text-black truncate"
                        onClick={() => handleContentUpdate(val)}
                      >
                        {key}
                      </li>
                    ))
                : Object.entries(ROLES).map(([key, val], index: number) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer text-black text-sm text-start hover:bg-blue-500 hover:text-black truncate"
                      onClick={() => handleContentUpdate(val)}
                    >
                      {key}
                    </li>
                  ))}
            </ul>
          </div>
        ) : (
          isOpen && (
            <div
              className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg ${
                openDirection === "down" ? "top-full" : "bottom-full"
              }`}
              ref={dropdownRef}
            >
              <div className="py-2 px-4 text-gray-600">No roles available</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
