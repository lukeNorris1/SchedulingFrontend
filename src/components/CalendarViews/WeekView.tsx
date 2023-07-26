import WeekDay from "./WeekDay";
import { days } from "../../utils/date";

interface props {
  currentDate: Date;
}

const WeekView = ({ currentDate }: props) => {
  currentDate

  const getFirstDayOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 7) - 6; // Adjust for Sunday
    return new Date(today.setDate(diff));
  };

  const firstDayOfWeek = getFirstDayOfWeek();

  const daysOfWeek = [...Array(7)].map((_, index) => {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + index - 1);
    return day;
  });

  const isNotThisMonth = (day: Date) => {
    const today = new Date();
    return day.getMonth() !== today.getMonth();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() == day;
  };

  return (
    <div className="grid grid-cols-7 bg-secondary-color text-black">
      {days.map((day, index) => (
        <div
          key={day}
          className="flex flex-col justify-center items-center text-center py-2 overflow-hidden"
        >
          <div>{day}</div>
          <div
            className={`${
              isToday(daysOfWeek[index].getDate())
                ? "flex justify-center items-align rounded-full w-6 bg-slate-700 text-white font-bold"
                : ""
            }`}
          >
            {daysOfWeek[index].getDate()}
          </div>
        </div>
      ))}
      {daysOfWeek.map((day, index) => (
        <div key={index} className="">
          <WeekDay
            key={index}
            dayNum={day.getDate()}
            disabled={isNotThisMonth(day)}
          />
        </div>
      ))}
    </div>
  );
};


export default WeekView;
