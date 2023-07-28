import { useEffect, useState } from "react";
import MonthView from "./MonthView";
import { months } from "../../utils/date";
import DateArrows from "./DateArrows";
import { ShiftProps } from "../../types/Shift";
import allShifts from "../../mock_data/allShifts";

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [shifts, setShifts] = useState<ShiftProps[] | null>();

  function handleDateChanger(direction: string) {
    direction == "left"
      ? setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate() //May cause issues when going back a day from a month with 31 days to a month with less if the current date is the 31st
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

  useEffect(() => {
    if (currentDate) {
      //Needed to remove the fluttering effect when changing months
      setShifts(null);
      getShifts();
    }
  }, [currentDate]);

  function getShifts() {
    setShifts(allShifts);
  }

  return (
    <div className="flex flex-col max-w-[100%] md:max-w-[70%] mx-auto mt-2 md:mt-8 bg-slate-800 text-white rounded-md">
      <div className="flex justify-between my-2">
        <div className="flex items-center flex-row max-w-30 gap-4 text-lg md:text-3xl ml-6">
          {`${months[currentDate.getMonth()]} ${currentDate.getUTCFullYear()}`}
        </div>
        <div className="flex items-center text-sm md:text-xl">
          <div className="mr-4">
            <DateArrows handleDateChanger={handleDateChanger} />
          </div>

          <span className="order-2 ml-3 mr-6">Month</span>
        </div>
      </div>
      <MonthView propDate={currentDate} shifts={shifts ? shifts : []} />
    </div>
  );
}
