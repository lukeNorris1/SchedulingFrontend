import React, { useContext, useEffect, useRef, useState } from "react";
import { User } from "../../types/User";
import UserContext from "../../context/UserContext";
import { DB_URL } from "../../utils/dbString";
interface EmployeeSelectProps {
  selectedEmployee: User | undefined;
  selectedRole: number | undefined;
  currentDate: Date;
  timePicked: boolean;
  setEmployee: any;
  hideEmployee?: boolean;
}

export default function EmployeeDropdown({
  currentDate,
  timePicked,
  selectedRole,
  selectedEmployee,
  setEmployee,
  hideEmployee,
}: EmployeeSelectProps) {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState<User[]>();
  const [_, setOpenDirection] = useState<"up" | "down">("down");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  async function getEmployees() {
    try {
      await fetch(`${DB_URL}/user/users`, {
        headers: {
          Authorization: `${user?.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          setEmployees(data);
        })
        .catch((error) => {
          // Handle the error
          console.error("Error:", error);
        });
    } catch (err) {
      console.log(`error: ${err}`);
    }
  }

  useEffect(() => {
    getEmployees();
  }, [user]);

  useEffect(() => {
    if (hideEmployee) setEmployee(undefined);
  }, [currentDate]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEmployeeSelection = (employee: User) => {
    setEmployee(employee);
    setIsOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }

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

  const filteredEmployees = employees?.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      employee.roles[employee.roles.length - 1] == selectedRole
  );

  //! still need current date to figure out which day it is for availability
  // function employeeAvailable(employee: User) {
  //   const startTime = "09:00 AM";
  //   const endTime = "11:00 AM";
  //   if (employee.availability[currentDate.getDay()]) {
  //     // const start = employee.availability[currentDate.getDay()]!.start;
  //     // const end = employee.availability[currentDate.getDay()]!.end;
  //     //&& compareTime(end, new Date(getValues('endDate')), true)
  //     if (true) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  //   return true;
  // }

  return (
    <div
      className="flex justify-end items-center gap-2 w-full"
      ref={dropdownRef}
    >
      <div className="relative">
        <div className="absolute left-2 px-[2px] -top-[0.5em] bg-slate-800 leading-none text-sm select-none">
          {"Employee"}
        </div>
        <button
          type="button"
          className={`py-2 px-4 h-12  rounded-md shadow-sm bg-slate-800 border-2 border-gray-600 text-white font-medium focus:outline-none ${
            !timePicked &&
            "bg-gray-700 text-gray-300 hover:border-gray-600 cursor-not-allowed"
          } ${
            isOpen && "!border-white"
          } transition ease-in-out delay-100 hover:border-white text-white font-medium`}
          onClick={toggleDropdown}
          disabled={!timePicked}
          
        >
          {isOpen ? (
            <input
              type="text"
              className=" bg-slate-500 h-6 w-32 py-2 overflow-hidden outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={(e) => e.stopPropagation()}
              ref={searchInputRef}
            />
          ) : (
            <span className="inline-block flex items-center h-6 w-32">
              <span className="truncate">
                {selectedEmployee !== undefined
                  ? selectedEmployee!.fullName
                  : ""}
              </span>
            </span>
          )}
        </button>
        {isOpen && filteredEmployees && filteredEmployees.length > 0 ? (
          <div
            className="absolute bottom-full md:bottom-auto mb-2 md:mb-0 z-10 max-h-60 h-auto overflow-auto scrollable-container mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg"
            
          >
            <ul className="py-1">
              {filteredEmployees.map((employee, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer text-black text-sm text-start hover:bg-blue-500 hover:text-black truncate"
                  onClick={() => handleEmployeeSelection(employee)}
                >
                  {employee.fullName}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          isOpen && (
            <div
              className="absolute bottom-full md:bottom-auto mb-2 md:mb-0 z-10 max-h-60 h-auto overflow-auto scrollable-container mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg"
              
            >
              <div className="py-2 px-4 text-gray-600 bg-white">
                No employees available
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
