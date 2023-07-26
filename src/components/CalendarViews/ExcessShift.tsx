import { useState, memo } from "react";
import { tConvert } from "../../utils/date";
import { ObjectId } from "mongodb";

interface SpecificShift {
  startTime: Date;
  endTime: Date;
  employeeId?: ObjectId;
}

export default function ExcessShift({
  startTime,
  endTime,
  employeeId,
}: SpecificShift) {
  function objectIdToRGB(objectId: ObjectId | undefined) {
    if (objectId == undefined) return { red: 149, green: 150, blue: 149 };
    // Extract the hexadecimal string representation of the ObjectId
    const hexString = objectId.toString().substring(0, 6);

    // Split the hexadecimal string into three equal parts
    const part1 = hexString.substring(0, 2);
    const part2 = hexString.substring(2, 4);
    const part3 = hexString.substring(4, 6);

    // Convert each part into its decimal equivalent
    const decimal1 = parseInt(part1, 16);
    const decimal2 = parseInt(part2, 16);
    const decimal3 = parseInt(part3, 16);

    // Normalize the decimal values to the range 0-255
    const red = Math.floor((decimal1 / 255) * 255);
    const green = Math.floor((decimal2 / 255) * 255);
    const blue = Math.floor((decimal3 / 255) * 255);

    // Return the RGB color as an object
    return { red, green, blue };
  }

  const { red, green, blue } = objectIdToRGB(employeeId);

  const divStyle = {
    backgroundColor: `rgb(${red},${green},${blue})`,
  };

  return (
    <div
      style={divStyle}
      className={`flex items-center  bg-opacity-50 border-b-2 border-slate-800 pl-1 py-[2px]`}
    >
      <div className="flex flex-col justify-center align-center md:flex-row md:justify-start md:ml-2 text-md md:text-base 2xl:text-md overflow-hidden">
        <span className="truncate line-clamp-1 break-all">
          {`${tConvert(startTime)}`}
        </span>
        <span className="truncate line-clamp-1 break-all hidden lg:inline">
          {`-  ${tConvert(endTime)}`}
        </span>
      </div>
    </div>
  );
}
