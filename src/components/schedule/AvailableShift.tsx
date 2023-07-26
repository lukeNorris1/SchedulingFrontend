import { formatDate, tConvert } from "../../utils/date";
import { ShiftProps } from "../../types/Shift";
import ScheduleOptions from "./ScheduleOptions";

interface availableProps {
  availableShifts: ShiftProps[] | undefined;
  addShift: (shift: ShiftProps) => void;
}

export default function AvailableShift({ availableShifts, addShift }: availableProps) {
  console.log(availableShifts)
  return (
    <>
    
      {availableShifts?.map((shift, index) => (
        <div
          key={index}
          className="max-w-[97%] md:max-w-[90%] min-w-[60%] md:min-w-[90%] bg-slate-400 shadow-md rounded-lg p-4 mb-4 hover:bg-blue-200 transition duration-300"
          onClick={() => {}}
        >
          <ScheduleOptions shift={shift} addShift={addShift}/>
          <div className="text-lg md:text-2xl font-bold text-blue-900 mb-2">
            {`${formatDate(shift.startTime)}`}
          </div>
          <div className="text-md md:text-lg text-gray-600">{`${tConvert(
            shift.startTime
          )} to ${tConvert(shift.endTime)}`}</div>
          
        </div>
      ))}
      
    </>
  );
}
