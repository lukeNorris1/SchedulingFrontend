import { useContext, useEffect, useState } from "react";
import { ShiftProps } from "../types/Shift";
import { DB_URL } from "../utils/dbString";
import UserContext from "../context/UserContext";
import { get } from "../utils/http";
import { months } from "../utils/date";
import DateArrows from "../components/CalendarViews/DateArrows";
import MonthView from "../components/CalendarViews/MonthView";
import EmployeeDropdown from "../components/Roster/EmployeeDropdown";
import RoleDropDown from "../components/Roster/RoleDropDown";
import { User } from "../types/User";
import { ObjectId } from "mongodb";
import allShifts from "../mock_data/allShifts";
import allAvailableShifts from "../mock_data/availableShifts";

export default function AllEmployeeShifts() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [shifts, setShifts] = useState<any[] | null>();
  const [selectedRole, setSelectedRole] = useState<number>();
  const [selectedEmployee, setSelectedEmployee] = useState<User | undefined>();
  const [shiftSelector, setShiftSelector] = useState<
    "all" | "available" | "employee" | undefined
  >();
  const { user } = useContext(UserContext);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!selectedEmployee) return;
    setShifts(null);
    getShifts();
  }, [selectedEmployee]);

  useEffect(() => {
    setShifts(null);
    if (shiftSelector == "all") getAllShifts();
    if (shiftSelector == "available") getAvailableShifts();
    if (shiftSelector == "employee") getShifts();
  }, [currentDate]);

  function getShifts() {
    setShiftSelector("employee");
    setShifts(allShifts);
  }

  function getAvailableShifts() {
    setShifts(allAvailableShifts);
    setShiftSelector("available");
  }

  function getAllShifts() {
    setSelectedEmployee(undefined);
    setShifts([...allShifts, ...allAvailableShifts]);
    setShiftSelector("all");
  }

  function handleDateChanger(direction: string) {
    direction == "left"
      ? setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          )
        )
      : setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
          )
        );
  }

  return (
    <div className="flex flex-col max-w-[100%] 2xl:max-w-[70%] mx-auto mt-0 md:mt-2 md:mt-8 pb-10 bg-slate-800 text-white rounded-none md:rounded-md">
      {isMobile ? (
        <div>
          <div className="flex justify-between">
            <div className="flex items-center flex-row max-w-30 gap-4 text-lg md:text-3xl ml-6">
              <span>{`${
                months[currentDate.getMonth()]
              } ${currentDate.getUTCFullYear()}`}</span>
            </div>
            <div className="flex items-center text-sm md:text-xl">
              <div className="flex gap-2">
                <button
                  className="bg-slate-700 rounded-lg p-1 px-2"
                  onClick={getAvailableShifts}
                >
                  {"Available"}
                </button>
                <button
                  className="bg-slate-700 rounded-lg p-1 px-2"
                  onClick={getAllShifts}
                >
                  {"All"}
                </button>
              </div>
              <div className="mr-4">
                <DateArrows handleDateChanger={handleDateChanger} />
              </div>
            </div>
          </div>
          <MonthView
            propDate={currentDate}
            shifts={shifts ? shifts : []}
            adminView={true}
          />
          <div className="flex justify-center items-center py-4">
            <div>
              <RoleDropDown
                selectedRole={selectedRole}
                setRole={(value) => setSelectedRole(value)}
              />
            </div>
            <div className="ml-4">
              <EmployeeDropdown
                selectedEmployee={selectedEmployee}
                selectedRole={selectedRole}
                currentDate={currentDate}
                timePicked={true}
                setEmployee={(value: User | undefined) =>
                  setSelectedEmployee(value)
                }
                hideEmployee={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between my-2">
            <div className="flex items-center flex-row max-w-30 gap-4 text-lg md:text-3xl ml-6">
              <span>{`${
                months[currentDate.getMonth()]
              } ${currentDate.getUTCFullYear()}`}</span>
            </div>
            <div className="flex items-center text-sm md:text-xl">
              <div className="flex gap-2 mr-6">
                <button
                  className="bg-slate-700 rounded-lg p-1 px-2"
                  onClick={getAvailableShifts}
                >
                  {"Available"}
                </button>
                <button
                  className="bg-slate-700 rounded-lg p-1 px-2"
                  onClick={getAllShifts}
                >
                  {"All"}
                </button>
              </div>
              <div>
                <RoleDropDown
                  selectedRole={selectedRole}
                  setRole={(value) => setSelectedRole(value)}
                />
              </div>
              <div className="ml-4">
                <EmployeeDropdown
                  selectedEmployee={selectedEmployee}
                  selectedRole={selectedRole}
                  currentDate={currentDate}
                  timePicked={true}
                  setEmployee={(value: User) => setSelectedEmployee(value)}
                />
              </div>
              <div className="mr-4">
                <DateArrows handleDateChanger={handleDateChanger} />
              </div>
            </div>
          </div>
          <MonthView
            propDate={currentDate}
            shifts={shifts ? shifts : []}
            adminView={true}
          />
        </div>
      )}
    </div>
  );
}
