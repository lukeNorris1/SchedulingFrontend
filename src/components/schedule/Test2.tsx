import React, { useEffect, useState } from "react";

interface shift {
  title: string;
  startTime: string;
  endTime: string;
  employee: string;
}

const shifts1: shift = {
  title: "test",
  startTime: "6:00",
  endTime: "9:00",
  employee: "luke",
};

const shifts2: shift = {
  title: "test",
  startTime: "6:00",
  endTime: "9:00",
  employee: "James",
};

const totalShifts: shift[][] = [
  [shifts2, shifts1, shifts1],
  [shifts2, shifts2, shifts2],
];

const heightOffset = 48

export default function CalendarComponent() {
  function calculateShiftArray() {}
  //   const [shifts, setShifts] = useState<shift[]>([]);

  return (
    <div className="flex bg-white ">
      <div className="w-24 border-r border-gray-400">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="h-12 flex items-center text-black justify-center border-b border-gray-400"
          >
            {i}:00
          </div>
        ))}
      </div>
      <div className="flex-grow">
        {Array.from({ length: 24 }, (_, i) => {
          return (
            <div
              key={i}
              className={`h-12 flex items-center relative border-b border-gray-400`}
              onClick={() => console.log(`time: ${i}`)}
            >
              <div className="relative ">
                {/* //! Not quite sure what is being output and why, figure it out tomorrow */}
                {totalShifts[i]?.map((shift, index) => {
                  console.log(totalShifts[i])
                  const eventStyle = {
                    height: `${400}px`,
                    top: `${-24 + (heightOffset * index)}px`
                  };

                  return (
                    <div
                      className="absolute bg-red-300 text-black overflow-hidden"
                      key={index}
                      style={eventStyle}
                    >
                      <div>{index}</div>
                      <div>{shift.employee}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
