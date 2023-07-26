import { useContext, useEffect, useRef, useState } from "react";
import DropdownSvg from "../Roster/DropdownSvg";
import UserContext from "../../context/UserContext";
import { ShiftProps } from "../../types/Shift";
import { DB_URL } from "../../utils/dbString";

interface props {
    shift: ShiftProps;
    addShift: (shift: ShiftProps) => void;
}

export default function ScheduleOptions({ shift, addShift }: props ) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  const handleContentUpdate = () => {
    setIsOpen(false);
    editShift()
    addShift(shift)
  };

  async function editShift(){
    const url = `${DB_URL}/shifts/edit/${shift._id}/take`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({employeeId: user?._id})
    })
    
  }

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
    <div className="relative  hover:cursor-pointer" ref={dropdownRef}>
      <div className="absolute top-0 -right-3 md:right-0">
        <div onClick={toggleDropdown} className="">
          <DropdownSvg stroke={"stroke-gray-300"}/>
        </div>

        {isOpen && (
          <div className="absolute w-32 top-6 right-0 bg-slate-400 border border-slate-600 text-white font-bold p-1" ref={dropdownRef}>
            <p onClick={handleContentUpdate}>Claim Shift</p>
          </div>
        )}
      </div>
    </div>
  );
}
