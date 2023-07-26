import { dateSuffixFormat, months, startEndOfDate } from "../../utils/date";
import LeftArrowSvg from "./ArrowSvg/LeftArrowSvg";
import RightArrowSvg from "./ArrowSvg/RightArrowSvg";

interface props {
  currentDate: Date;
  setWeek: (value: Date) => void;
}

export default function WeekSelector({ currentDate, setWeek }: props) {
  const height = 48;
  const width = 48;
  const dateBlockStart = startEndOfDate(new Date()).end;
  const dateBlockEnd = startEndOfDate(new Date(
    dateBlockStart.getFullYear(),
    dateBlockStart.getMonth() + 1,
    dateBlockStart.getDate())).start
  

  function setDayForward() {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    if (!(newDate > dateBlockEnd)) {
      setWeek(new Date(newDate));
    }
  }

  function setDayBackward() {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    if (!(newDate <= dateBlockStart)) {
      setWeek(new Date(newDate));
    }
  }

  function weekStartDate(date: Date): number {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + 1;
    const weekStart = new Date(date.getFullYear(), date.getMonth(), diff);
    return weekStart.getDate() - 1;
  }

  function weekEndDate(date: Date): number {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek;
    const weekStart = new Date(date.getFullYear(), date.getMonth(), diff);
    weekStart.setDate(weekStart.getDate() + 6);
    return weekStart.getDate();
  }

  return (
    <div className="mt-4 md:mt-0 px-10 py-4 rounded-lg flex justify-center items-center bg-slate-800 gap-6 mb-2 text-black p-2">
      <div className="flex flex-col">
        <h1 className="text-blue-400 font-bold text-lg">
          {`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
        </h1>
        <div className="flex justify-center items-center text-white font-bold">
          <button onClick={setDayBackward}>
            <LeftArrowSvg width={width} height={height} />
          </button>
          <div className="w-40 mx-2">
            <span>{`${dateSuffixFormat(weekStartDate(currentDate))}`}</span>
            <span className="px-4">{" - "}</span>
            <span>{`${dateSuffixFormat(weekEndDate(currentDate))}`}</span>
          </div>
          <button onClick={setDayForward}>
            <RightArrowSvg width={width} height={height} />
          </button>
        </div>
      </div>
    </div>
  );
}
