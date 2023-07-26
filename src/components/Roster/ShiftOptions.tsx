import { useEffect, useRef, useState } from "react";
import DropdownSvg from "./DropdownSvg";

interface shiftProps {
  removeShift: () => void;
}

export default function ShiftOptions({ removeShift }: shiftProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  const handleContentUpdate = () => {
    removeShift();
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

  return (
    <div className="" ref={dropdownRef}>
      <div className="relative">
        <div onClick={toggleDropdown}>
          <DropdownSvg />
        </div>

        {isOpen && (
          <div className="absolute right-0">
            <p onClick={handleContentUpdate}>Delete</p>
          </div>
        )}
      </div>
    </div>
  );
}
