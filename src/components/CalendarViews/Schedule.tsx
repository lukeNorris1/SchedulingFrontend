import { useEffect, useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import { months } from "../../utils/date";
import WeekCalendar from "./WeekCalendar";
import DateArrows from "./DateArrows";
import { ShiftProps } from "../../types/Shift";
import allShifts from '../../mock_data/allShifts';

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewState, setViewState] = useState("month");
  const [shifts, setShifts] = useState<ShiftProps[] | null>();


  function dateHandler(dateFormat: string) {
    if (dateFormat === "week" && viewState !== "week") setViewState("week");
    else if (dateFormat === "month" && viewState !== "month")
      setViewState("month");
  }

  function handleDateChanger(direction: string) {
    if (viewState == "month") {
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
    if (viewState == "week") {
      direction == "left"
        ? setCurrentDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - 7
            )
          )
        : setCurrentDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + 7
            )
          );
    }
  }

  useEffect(() => {
    if (currentDate) {
        //Needed to remove the fluttering effect when changing months
        setShifts(null)
        getShifts();
    }
  }, [currentDate])

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
          <button className="order-1 ml-2" onClick={() => dateHandler("week")}>
            Week
          </button>
          <button
            className="order-2 ml-2 mr-3"
            onClick={() => dateHandler("month")}
          >
            Month
          </button>
        </div>
      </div>
      {viewState === "month" ? (
        <MonthView propDate={currentDate} shifts={shifts ? shifts : []} />
      ) : (
        <div>
          <WeekCalendar weekStartDate={currentDate} />
          <WeekView currentDate={currentDate} />
        </div>
      )}
    </div>
  );
}
