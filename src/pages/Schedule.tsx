import { useState } from "react";
import { ShiftProps } from "../types/Shift";
import { formatDate, tConvert } from "../utils/date";
import ShiftOptions from "../components/ShiftOptions";
import AvailableShift from "../components/schedule/AvailableShift";
import allShifts from "../mock_data/allShifts";
import allAvailableShifts from "../mock_data/availableShifts";

export default function Schedule() {
  const [shifts, setShifts] = useState<ShiftProps[]>(allShifts);
  const [availableShifts, setAvailableShifts] = useState<ShiftProps[]>(allAvailableShifts);
  const [selectedShift, setSelectedShift] = useState<ShiftProps | null>(null);

  function removeCurrentShift(shift: ShiftProps) {
    const indexToRemove = shifts!.indexOf(shift);
    const updatedShifts = [
      ...shifts!.slice(0, indexToRemove),
      ...shifts!.slice(indexToRemove + 1),
    ];
    setShifts(updatedShifts);
    if (setAvailableShifts.length == 0) setAvailableShifts([shift]);
    else setAvailableShifts([...availableShifts!, shift]);
  }

  function addCurrentShift(shift: ShiftProps) {
    const indexToRemove = availableShifts.indexOf(shift);
    const updatedShifts = [
      ...availableShifts!.slice(0, indexToRemove),
      ...availableShifts!.slice(indexToRemove + 1),
    ];
    setAvailableShifts(updatedShifts);
    setShifts([...shifts!, shift]);
  }

  return (
    <div className="py-8 text-yellow-300">
      <header className="text-3xl text-center text-yellow-300 font-bold mb-8">
        {`${shifts == null || shifts.length == 0 ? "No" : ""} Upcoming Shifts`}
      </header>
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto">
        {shifts?.map((shift, index) => (
          <div
            key={index}
            className="max-w-[97%] md:max-w-[90%] min-w-[60%] md:min-w-[90%] bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-blue-200 hover:cursor-pointer transition duration-300"
            onClick={() => setSelectedShift(shift)}
          >
            <div className="text-lg md:text-2xl font-bold text-blue-700 mb-2">
              {`${formatDate(shift.startTime)}`}
            </div>
            <div className="text-md md:text-lg text-gray-600">{`${tConvert(
              shift.startTime
            )} to ${tConvert(shift.endTime)}`}</div>
          </div>
        ))}
      </div>
      <header className="text-3xl text-center text-yellow-300 font-bold my-8">
        Available Shifts
      </header>
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto pb-10 md:pb-0">
        <AvailableShift
          availableShifts={availableShifts ? availableShifts : undefined}
          addShift={(shift: ShiftProps) => addCurrentShift(shift)}
        />
      </div>
      <ShiftOptions
        selectedShift={selectedShift}
        setSelectedShift={setSelectedShift}
        removeShift={(shift: ShiftProps) => removeCurrentShift(shift)}
      />
    </div>
  );
}
