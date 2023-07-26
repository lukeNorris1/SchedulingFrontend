import { ROLES } from "../../types/User";
import { createShift } from "../../types/Shift";
import ShiftOptions from "./ShiftOptions";

interface RoleShiftsProps {
  shiftAllocation: createShift[][];
  currentDate: Date;
  removeShift: (value: number) => void;
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export default function RoleShifts({
  shiftAllocation,
  currentDate,
  removeShift,
}: RoleShiftsProps) {
  return (
    <div className="flex flex-col md:px-6">
      {Object.entries(ROLES).map((role, index) => {
        const hasShifts =
          shiftAllocation[currentDate.getDate()]?.filter(
            (shift) => shift.employeeRole === role[1]
          ).length > 0;

        if (role[0] !== "Admin" && hasShifts) {
          return (
            <div key={index} className="mb-4 pb-2">
              <div className="text-start text-3xl font-bold text-white pb-4">
                {role[0]}
              </div>
              <div className="">
                {shiftAllocation[currentDate.getDate()]?.map(
                  (shift, shiftIndex) =>
                    shift.employeeRole === role[1] ? (
                      <div
                        key={shiftIndex}
                        className="relative bg-gray-900 p-4 rounded shadow-md text-white mb-4"
                      >
                        <div className="absolute right-2 top-2">
                          <ShiftOptions
                            removeShift={() => {
                              removeShift(shiftIndex);
                            }}
                          />
                        </div>
                        <p className="text-gray-400">
                          {shift.employeePosition
                            ? shift.employeePosition
                            : "Not Defined"}
                        </p>
                        <div className="mt-2">
                          <p>{shift.employeeName}</p>
                          <p>
                            {formatTime(shift.startTime)} -{" "}
                            {formatTime(shift.endTime)}
                          </p>
                        </div>
                      </div>
                    ) : null
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
