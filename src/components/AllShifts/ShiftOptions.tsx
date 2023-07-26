import { useEffect, useRef, useState } from "react";
import DropdownSvg from "../Roster/DropdownSvg";
import { ShiftProps } from "../../types/Shift";
import { DB_URL } from "../../utils/dbString";
import { useNavigate, } from "react-router-dom";

interface props {
  shift: ShiftProps;
  removeShift: (value: ShiftProps) => void;
  closePopup: () => void;
}


export default function ShiftOptions({ shift, removeShift, closePopup }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  const editShift = () => {
    navigate(`/admin/shift/edit/${shift._id}`)
  };

  async function deleteShiftHandler() {
    try {
      const url = `${DB_URL}/shifts/delete/${shift?._id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (!response.ok) {
        throw new Error("Failed to delete shift");
      } else if (response.ok) {
        removeShift(shift)
        setIsOpen(false)
        closePopup()
      }
    } catch (error) {
      console.error(error);
    }
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
      <div className="absolute top-0 -right-0 md:right-0">
        <div onClick={toggleDropdown} className="">
          <DropdownSvg stroke={"stroke-blue-400 hover:stroke-black"} />
        </div>

        {isOpen && (
          <div
            className="absolute w-fit p-1 top-6 right-2 bg-slate-400 border border-slate-600 text-white font-bold p-1"
          >
            <div className="flex flex-col gap-1 w-fit [&>span]:px-2">
              <span className="bg-slate-600 hover:bg-slate-700" onClick={editShift}>
                Edit
              </span>
              <span className="bg-slate-600 hover:bg-slate-700" onClick={deleteShiftHandler}>
                Delete
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
