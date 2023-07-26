import { ShiftProps } from "../../types/Shift.js";
import Shift from "./Shift.js";
interface DayProps {
  disabled?: boolean;
  dayNum: number;
  shifts?: ShiftProps[];
  today?: boolean;
  eventAdd?: (shift: any) => void;
  toggleDropdown?: any;
  setDay?: (value: number) => void;
}

export default function MonthDay({
  eventAdd,
  disabled,
  dayNum,
  shifts,
  today,
  toggleDropdown,
  setDay,
}: DayProps) {
  if (disabled) {
    return (
      <div
        key={dayNum}
        className="h-20 lg:h-32 bg-disabled-color text-xs md:text-lg relative border border-slate-800"
      >
        <span className="absolute top-0 right-0 pr-[2px] md:p-2 text-black z-2">
          {dayNum}
        </span>
      </div>
    );
  }

  function handleDropdown() {
    if (setDay) setDay(dayNum);
    toggleDropdown();
  }

  const tempShifts = !shifts
    ? []
    : shifts.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );

  const firstShifts = tempShifts.slice(0, 3);
  const otherShifts = tempShifts.length > 3 ? tempShifts.slice(3) : undefined;

  return (
    <div
      key={dayNum}
      className={`h-20 lg:h-32 bg-white relative text-xs md:text-lg text-black border border-slate-400 text-center `}
    >
      <div className="absolute top-0 right-0 pr-[2px] md:p-2 font-bold text-black pointer-events-none">
        <p
          className={`${
            today
              ? " bg-blue-500 rounded-full h-[17px] w-[16px] md:h-7 md:w-7 bg-primary-color text-white"
              : ""
          }`}
        >
          {dayNum}
        </p>
      </div>
      <div className={`flex flex-col h-full `}>
        {firstShifts.map((shift, i) => {
          return (
            <div
              key={i}
              className="min-w-[80%] md:w-[90%] hover:cursor-pointer "
              onClick={() => {
                eventAdd ? eventAdd(shift) : null;
              }}
            >
              <Shift
                startTime={shift.startTime}
                endTime={shift.endTime}
                employeeId={shift.employeeId}
              />
            </div>
          );
        })}
        {shifts && shifts?.length > 3 && (
          <div
            key={2}
            className="min-w-[80%] md:w-[90%] hover:cursor-pointer hover:bg-blue-200 "
          >
            <div
              className="flex justify-center align-center pr-2 text-xs md:text-sm 2xl:text-md"
              onClick={handleDropdown}
            >
              {otherShifts?.length} more
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
