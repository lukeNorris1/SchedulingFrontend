import React from "react";
import { days } from "../../utils/date";

interface Props {
  availability: Record<number, { start: string; end: string }> | undefined;
  onAvailabilityChange: (
    dayId: number,
    startTime: string,
    endTime: string
  ) => void;
}

const TimePicker: React.FC<Props> = ({ availability, onAvailabilityChange }) => {
  const toggleTime = (dayId: number, time: { start: string; end: string }) => {
    onAvailabilityChange(dayId, time.start, time.end);
  };

  const handleStartTimeChange = (
    dayId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: startTime } = e.target;
    const endTime = availability?.[dayId]?.end || "";

    toggleTime(dayId, { start: startTime, end: endTime });
  };

  const handleEndTimeChange = (
    dayId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: endTime } = e.target;
    const startTime = availability?.[dayId]?.start || "";

    toggleTime(dayId, { start: startTime, end: endTime });
  };

  return (
    <div className="flex flex-col items-center">
      {days.map((day, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center mt-4">
          <span className="mb-2 md:mb-0 md:mr-2 w-24 text-black">
            {day}
          </span>
          <div className="flex">
            <input
              type="time"
              value={availability?.[index]?.start || ""}
              onChange={(e) => handleStartTimeChange(index, e)}
              className="py-2 px-4 rounded-lg bg-gray-200 text-gray-800 mr-2"
            />
            <span className="my-auto hidden text-black md:block mr-2">-</span>
            <input
              type="time"
              value={availability?.[index]?.end || ""}
              onChange={(e) => handleEndTimeChange(index, e)}
              className="py-2 px-4 rounded-lg bg-gray-200 text-gray-800"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimePicker;
