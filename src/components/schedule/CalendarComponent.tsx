import {  useState } from "react";
import { days } from "../../utils/date";

export default function CalendarComponent() {
  const [selectedDay] = useState(0)


  return (
    <div className="flex flex-col justify-center items-center text-white ">
      <div className="flex gap-2 bg-white text-black p-2">
        <div>Back</div>
        <div>{days[selectedDay]}</div>
        <div>Next</div>
      </div>
      <div className="pt-10">
        <div>EMPLOYEE</div>
        <div className="">
          <div className="flex gap-2 bg-slate-700 p-4 rounded-2xl mb-4">
            <div>Start: 9:00 AM</div>
            <div>End: 12:00 PM</div>
            <div>Name: Luke Norris</div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input type="text" value={"test"} />
            <div> add </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <div>MANAGER</div>
        <div className="flex">
          <div className="flex gap-2">
            <input type="text" value={"test"} />
            <div> add </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 bg-white text-black font-bold px-3 py-2 hover:cursor-pointer">
        Save
      </div>
    </div>
  );
}
