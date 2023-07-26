import { useEffect } from "react";
import { ShiftProps } from "../../types/Shift.js";

interface DayProps {
  disabled?: boolean;
  dayNum: number;
  shifts?: ShiftProps[];
  today?: boolean;
}

export default function WeekDay({ disabled, dayNum, shifts, today }: DayProps) {
  useEffect(() => {
    if (shifts && shifts.length > 0) {
      today
    }
  }, [shifts]);

  if (disabled) {
    return (
      <div
        key={dayNum}
        className="w-34 h-20 bg-disabled-color relative border border-slate-800 text-center"
      >
        <span className="absolute top-0 right-0 p-1 text-black z-2">
          {dayNum}
        </span>
      </div>
    );
  }

  //! Currently cant get numbers to the left to display the times associated with the divs
  return (
    <div className="">
      {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
        <div
          key={num}
          className={`w-34 h-8 flex flex-col justify-center items-align bg-white text-black   p-2`}
        >
          {num}
        </div>
      ))}
    </div>
  );
}
