import React, { useState, useRef, useEffect } from "react";

interface props {
  date: Date;
  onChange: any;
  title: string;
}

/*
  React Time Picker Component
  Lightweight time component as a direct replacement for the input time element

  Props:
    date: Date - Used to control the initial time of the component and as a state to maintain the picker
    setDate: Function - Update the date object when the time changes in any way



*/

export default function TimePicker({ date, onChange, title }: props) {
  const [selectedTime, setSelectedTime] = useState<Date>(date);
  const [selectedAmPm, setSelectedAmPm] = useState("AM");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hours = Array.from({ length: 12 }, (_, index) => index); // Numbers from 0 to 12
  const minutes = Array.from({ length: 60 }, (_, index) => index); // Numbers from 0 to 60

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  useEffect(() => {
    if (date.getTime() !== selectedTime.getTime()) {
      setSelectedTime((prevTime) => {
        const updatedTime = new Date(prevTime);
        updatedTime.setDate(date.getDate());
        return updatedTime;
      });
    }
  }, [date]);

  useEffect(() => {
    const hours = date.getHours();
    setSelectedAmPm(hours >= 12 ? "PM" : "AM");
  }, []);  

  useEffect(() => {
    if (date !== selectedTime) {
      onChange(selectedTime);
    }
  }, [selectedTime, date, onChange]);

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  const handleHourChange = (hour: number) => {
    const updatedDate = new Date(selectedTime);
    if (selectedAmPm === "AM") {
      updatedDate.setHours(hour);
    } else if (selectedAmPm === "PM") {
      updatedDate.setHours(hour + 12);
      updatedDate.setDate(selectedTime.getDate())
    }
    updatedDate.setMinutes(selectedTime.getMinutes()); // Preserve the minutes
    setSelectedTime(updatedDate);
  };

  const handleMinuteChange = (minute: number) => {
    const updatedDate = new Date(selectedTime);
    updatedDate.setMinutes(minute);
    setSelectedTime(updatedDate);
  };

  const handleTimePeriodChange = (e: any) => {
    if (selectedAmPm === "AM" && e.target.innerHTML === "PM") {
      setSelectedAmPm("PM");
      handleHourChange(selectedTime.getHours() + 12);
    } else if (selectedAmPm == "PM" && e.target.innerHTML === "AM") {
      setSelectedAmPm("AM");
      handleHourChange(selectedTime.getHours());
    }
  };

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function formatTime(time: Date) {
    const newDate = new Date(time);
    const hours = newDate.getHours();
    const twelveHourFormat = hours % 12 || 12;
    const minutes = newDate.getMinutes();
    return `${twelveHourFormat}${minConvert(minutes)}`;
  }

  function minConvert(minutes: number) {
    if (minutes < 10 && minutes > 0) return `:0${minutes}`;
    if (minutes == 0) return ":00";
    if (!minutes) return ":00";
    return `:${minutes}`;
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="absolute left-2 -top-[0.5em] px-[2px] bg-slate-800 leading-none text-sm select-none">
        {title}
      </div>
      <div
        className={`flex justify-center items-center px-2 py-[2px] w-32 h-12 text-lg rounded-md rounded-l-md border-2 border-gray-600 ${
          isOpen && "border-white"
        } hover:border-white  transition ease-in-out delay-100 text-white select-none font-medium hover:cursor-pointer`}
        onClick={handleOpen}
      >{`${formatTime(selectedTime)} ${selectedAmPm}`}</div>
      {isOpen && (
        <div
          className="absolute z-20 w-32 h-40 bg-slate-700 text-white cursor-default"
        >
          <div className="flex p-[2px]">
            <div className="flex flex-col h-40 bg-slate-700 overflow-scroll no-scrollbar">
              {hours.map((number) => {
                return (
                  <div
                    key={number}
                    className={`p-2 bg-slate-700 hover:bg-slate-800 ${
                      selectedTime.getHours() % 12 == number &&
                      "!bg-slate-400 font-bold hover:!bg-slate-800"
                    }`}
                    onClick={() => handleHourChange(number)}
                  >
                    {number}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col max-h-40 overflow-scroll no-scrollbar">
              {minutes.map((number) => (
                <div
                  key={number}
                  className={`p-2 bg-slate-700 hover:bg-slate-800 ${
                    selectedTime.getMinutes() == number &&
                    "!bg-slate-400 font-bold hover:!bg-slate-800"
                  }`}
                  onClick={() => handleMinuteChange(number)}
                >
                  {number < 10 ? `0${number}` : number}
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-2 bg-slate-700 grow">
              <div>
                <div
                  className={`p-2 hover:bg-slate-800 ${
                    selectedAmPm == "AM" &&
                    "!bg-slate-400 font-bold hover:!bg-slate-800"
                  }`}
                  onClick={handleTimePeriodChange}
                >
                  {"AM"}
                </div>
                <div
                  className={`p-2 hover:bg-slate-800 ${
                    selectedAmPm == "PM" &&
                    "!bg-slate-400 font-bold hover:!bg-slate-800"
                  }`}
                  onClick={handleTimePeriodChange}
                >
                  {"PM"}
                </div>
              </div>
              <button
                className="p-1 mb-1 bg-slate-700 text-sm rounded-lg border border-white hover:bg-slate-800"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
