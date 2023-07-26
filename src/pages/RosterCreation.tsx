import { useContext, useState } from "react";
import { createShift } from "../types/Shift";
import RosterAddForm from "../components/Roster/RosterAddForm";
import DaySelector from "../components/Roster/DaySelector";
import RoleShifts from "../components/Roster/RoleShifts";
import UserContext from "../context/UserContext";
import WeekSelector from "../components/Roster/WeekSelector";
import { DB_URL } from "../utils/dbString";
import { useNavigate } from "react-router-dom";

export default function RosterCreation() {
  const [shiftAllocation, setShiftAllocation] = useState<createShift[][]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(getNextSunday);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  function getNextSunday() {
    const tempDate = new Date();
    const newDay = tempDate.getDay();
    const remainingDays = 7 - newDay;
    const nextSunday = new Date(
      tempDate.getTime() + remainingDays * 24 * 60 * 60 * 1000
    );
    return nextSunday;
  }

  function addShift(shift: createShift) {
    console.log(shift);
    const dayIndex = currentDate.getDate();
    setShiftAllocation((prev) => {
      const newArray = [...prev];
      if (!newArray[dayIndex]) {
        newArray[dayIndex] = [];
      }
      newArray[dayIndex].push(shift);
      return newArray;
    });
  }

  function removeShift(shiftIndex: number) {
    setShiftAllocation((prevShifts) => {
      const newShifts = [...prevShifts];
      newShifts[currentDate.getDate()].splice(shiftIndex, 1);
      return newShifts;
    });
  }

  function handleSubmit() {
    createSchedule();
  }

  function midnightOfDate(date: Date) {
    const tempDate = new Date(date);
    tempDate.setHours(0);
    tempDate.setMinutes(0);
    return tempDate;
  }

  async function createSchedule() {
    if (shiftAllocation.length === 0) {
      console.log("No shifts to create.");
      return;
    }

    const transformedShifts = shiftAllocation.map(
      (innerArray) =>
        innerArray?.map(({ createdBy, employeeId, startTime, endTime }) => ({
          createdBy,
          employeeId,
          startTime,
          endTime,
        })) || []
    );

    // Flatten the transformedShifts array to make it 2D
    const flattenedShifts = transformedShifts.flat();

    const url = `${DB_URL}/shifts/create/`;
    try {
      const response = await fetch(url, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.token}`,
        },
        body: JSON.stringify(flattenedShifts),
      });

      if (response.ok) {
        navigate('/admin')
      } else if (response.status === 404) {
        // No next shift found for the employee
        console.log(`error: ${response.statusText}`);
      } else {
        // Handle other error cases
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex flex-col justify-center items-center w-full mb-16 md:mb-0">
      <WeekSelector
        currentDate={currentDate}
        setWeek={(value: Date) => {
          setCurrentDate(value);
        }}
      />
      <DaySelector
        currentDate={currentDate}
        setCurrentDate={(value: Date) => {
          setCurrentDate(value);
        }}
      />
      {/* Botton container */}
      <div className="bg-slate-800 p-2 rounded-xl w-[90%] md:w-fit">
        {/* Add employee bar */}
        <div className="flex justify-center">
          <RosterAddForm
            addShift={addShift}
            currentDate={midnightOfDate(currentDate)}
          />
        </div>
        <RoleShifts
          shiftAllocation={shiftAllocation}
          currentDate={currentDate}
          removeShift={removeShift}
        />
      </div>
      <button
        className="p-4 bg-slate-700 rounded-lg my-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
