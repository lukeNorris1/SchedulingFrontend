import { useEffect, useState } from "react";
import { ShiftProps } from "../types/Shift";
import { formatDate, tConvert } from "../utils/date";
import mockNextShift from "../mock_data/nextShift";

const TIME_FROM_SHIFT = 2;

export default function Home() {
  const [nextShift] = useState<ShiftProps>(mockNextShift);
  const [clockState, setClockState] = useState<"clockOn" | "clockOff" | "off">(
    "clockOn"
  );
  const [isLoading] = useState<boolean>(false);
  const [errors] = useState<string>();

  useEffect(() => {
    if (nextShift) checkClockOnEntryExists();
  }, [nextShift]);

  // async function createClockOnEvent() {
  //   try {
  //     const url = `${DB_URL}/clockInOut/create`;

  //     const body = {
  //       shiftId: nextShift?._id,
  //       employeeId: user?._id,
  //       eventType: "clockOn",
  //     };

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create clock-in/out event");
  //     }

  //     checkClockOnEntryExists();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function createClockOffEvent() {
    // try {
    //   const url = `${DB_URL}/clockInOut/create`;

    //   const body = {
    //     shiftId: nextShift?._id,
    //     employeeId: user?._id,
    //     eventType: "clockOff",
    //   };

    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to create clock-in/out event");
    //   }

    //   // Clock-in/out event created successfully
    //   console.log("Clock-in/out event created");
    //   setClockState("off");
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const checkClockOnEntryExists = async () => {
    // try {
    //   const url = `${DB_URL}/clockInOut/checkClockOn`;

    //   const body = {
    //     shiftId: nextShift?._id,
    //     employeeId: user?._id,
    //   };

    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to check clock-on entry");
    //   }

    //   const data = await response.json();

    //   // Check the response from the server
    //   if (data.clockState == "clockOff") {
    //     setClockState("clockOff");
    //     // Allow the user to clock off
    //   } else if (data.clockState == "clockOn") {
    //     setClockState("clockOn");
    //     // Allow the user to clock on
    //   } else if (data.clockState == "off") {
    //     setClockState("off");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  /*
   * On page load, if there  is a shift is ~2 hours either side of current time. Then check if user already has a clock on for that shift if they do.
   * show clock off - time from end time
   * else say clock On and time until shift start time. can be positive or negative
   */

  const calculateTimeDifference = (
    date: Date
  ): { timeDifference: string; days: number; hours: number } => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid date object");
    }

    const currentTime = new Date();
    const timeDifferenceInMilliseconds = date.getTime() - currentTime.getTime();
    const timeDifferenceInMinutes = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60)
    );

    const days = Math.floor(timeDifferenceInMinutes / (60 * 24));
    const hours = Math.floor((timeDifferenceInMinutes % (60 * 24)) / 60);
    const minutes = timeDifferenceInMinutes % 60;

    let formattedTimeDifference = "";

    if (days > 0)
      formattedTimeDifference += `${days} day${days > 1 ? "s" : ""}, `;

    if (hours > 0) {
      formattedTimeDifference += `${hours} hour${
        hours !== 1 ? "s" : ""
      }, ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      formattedTimeDifference += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }

    return {
      timeDifference: formattedTimeDifference,
      days: days,
      hours: hours,
    };
  };

  if (!nextShift) return <>No Available Shift</>;

  if (isLoading) return <>Loading ...</>;

  const {
    timeDifference: startTimeDifference,
    days: startDays,
    hours: startHours,
  } = calculateTimeDifference(new Date(nextShift?.startTime));
  const {
    timeDifference: endTimeDifference,
    days: endDays,
    hours: endHours,
  } = calculateTimeDifference(new Date(nextShift?.endTime));

  return (
    <div className="flex flex-col mt-10 md:mt-4 justify-center items-center">
      {nextShift ? (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <div className="flex flex-col bg-slate-800 text-white p-4 rounded-l-xl">
              <span>Next shift: </span>
              <span>{`${formatDate(nextShift!.startTime)}`}</span>
              <span>{`${tConvert(nextShift!.startTime)} - ${tConvert(
                nextShift!.endTime
              )}`}</span>
            </div>
            <div className="flex flex-col h-auto justify-center items-center bg-blue-700 rounded-r-lg">
              {clockState == "clockOn" ? (
                <>
                  {startHours + 24 * startDays <= TIME_FROM_SHIFT && (
                    <div
                      className="text-white font-bold p-2 hover:cursor-pointer border-2 border-gray-400 rounded-xl m-2 hover:bg-blue-400"
                      onClick={() => setClockState("clockOff")}
                    >
                      Clock on for {tConvert(nextShift!.startTime)} shift
                    </div>
                  )}
                  <span className="text-gray-300 text-sm px-2">
                    {startTimeDifference}{" "}
                  </span>
                </>
              ) : clockState == "clockOff" ? (
                <>
                  {endHours + 24 * endDays <= TIME_FROM_SHIFT && (
                    <div
                      className="text-white font-bold p-2 hover:cursor-pointer border-2 border-gray-400 rounded-xl m-2 hover:bg-blue-400"
                      onClick={() => createClockOffEvent()}
                    >
                      Clock off for {tConvert(nextShift!.endTime)} shift
                    </div>
                  )}

                  <span className="text-gray-300 text-sm px-2">
                    {endTimeDifference}
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white w-fit text-black font-xl p-4 rounded-md">
          {errors ? (
            <>
              <p>{errors}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}
