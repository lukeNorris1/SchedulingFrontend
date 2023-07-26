import React from "react";
import { days } from "../../utils/date";
import LeftArrowSvg from "./ArrowSvg/LeftArrowSvg";
import RightArrowSvg from "./ArrowSvg/RightArrowSvg";

interface props {
  currentDate: Date;
  setCurrentDate: (value: Date) => void;
}

export default function DaySelector({ currentDate, setCurrentDate }: props) {
  function setDayForward() {
  if (currentDate.getDay() === 6) return;
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + 1);
  setCurrentDate(newDate);
}

function setDayBackward() {
  if (currentDate.getDay() === 0) return;
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() - 1);
  setCurrentDate(newDate);
}

  const height = 48;
  const width = 48;

  return (
    <div className="relative flex justify-center">
      <div className="w-fit px-10 py-4 rounded-lg flex justify-center items-center bg-slate-800 gap-6 mb-6 text-black p-2">
        <button className="" onClick={setDayBackward}>
          <LeftArrowSvg width={width} height={height} />
        </button>
        <div className="flex flex-col w-32 text-white font-bold">
          <span>{`${days[currentDate.getDay()]}`}</span>
          <span>{currentDate.getDate()}</span>
        </div>
        <button className="" onClick={setDayForward}>
          <RightArrowSvg width={width} height={height} />
        </button>
      </div>
    </div>
  );
}
