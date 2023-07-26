import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { ShiftProps } from "../../types/Shift";
import { formatDate, tConvert } from "../../utils/date";
import { User, getHighestRole } from "../../types/User";
import { DB_URL } from "../../utils/dbString";
import { ObjectId } from "mongodb";
import ShiftOptions from "../AllShifts/ShiftOptions";

interface shiftClockEvent {
  id: ObjectId;
  employeeId: ObjectId;
  shiftId: ObjectId;
  eventType: string;
  timestamp: Date;
}

interface PopupProps {
  selectedShift: ShiftProps | null;
  setSelectedShift: React.Dispatch<React.SetStateAction<ShiftProps | null>>;
  removeShift: (value: ShiftProps) => void;
}

export default function AdminPopup({
  selectedShift,
  setSelectedShift,
  removeShift,
}: PopupProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<User | undefined>();
  const [shiftClockEvents, setShiftClockEvents] = useState<
    shiftClockEvent[] | undefined
  >();

  function closeModal() {
    setSelectedShift(null);
    setShiftClockEvents(undefined);
  }

  useEffect(() => {
    if (selectedShift) {
      getEmployee();
      getClockEventsByShiftId();
    }
  }, [selectedShift]);

  if (!selectedShift) return <></>;

  async function getEmployee() {
    if (selectedShift?.employeeId == undefined) return;
    try {
      await fetch(`${DB_URL}/user/${selectedShift?.employeeId}`)
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          setSelectedEmployee(data);
        })
        .catch((error) => {
          // Handle the error
          console.error("Error:", error);
        });
    } catch (err) {
      console.log(`error: ${err}`);
    }
  }

  async function getClockEventsByShiftId() {
    try {
      const url = `${DB_URL}/clockInOut/shift/${selectedShift?._id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const clockEvents = await response.json();

      if (!response.ok) {
        throw new Error("Failed to create clock-in/out event");
      } else if (response.ok) {
        if (clockEvents.length == 0) return;
        setShiftClockEvents(clockEvents);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function eventOutputHandler(event: string) {
    if (event == "clockOn") return "Clocked on - ";
    else if ((event = "clockOff")) return "Clocked off - ";
  }

  const employeeRole = () => {
    const role = getHighestRole(Math.max(...selectedEmployee!.roles));
    return <span>{`Role: ${role}`}</span>;
  };

  function shiftBeforeCurrentDate(shift: Date) {
    return shift > new Date();
  }

  return (
    <>
      <Transition appear show={selectedShift != null} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed bottom-[0%] inset-0 overflow-y-auto flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col max-w-md transform overflow-hidden rounded-2xl bg-white p-12 text-center align-middle shadow-xl transition-all">
                {shiftBeforeCurrentDate(new Date(selectedShift.startTime)) && (
                  <div className="fixed top-0 right-0 m-4">
                    <ShiftOptions shift={selectedShift} removeShift={removeShift} closePopup={closeModal} />
                  </div>
                )}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <span className="text-2xl ">
                    {formatDate(selectedShift.startTime)}
                  </span>
                </Dialog.Title>
                <div className="flex flex-col gap-1 pt-4 font-medium text-black">
                  {selectedEmployee &&
                    selectedShift.employeeId != undefined && (
                      <>
                        <span>{selectedEmployee?.fullName}</span>
                        {employeeRole()}
                      </>
                    )}
                  <span>
                    {`Shift starts at: ${tConvert(
                      new Date(selectedShift.startTime)
                    )}`}
                  </span>
                  <span>
                    {`Shift ends at: ${tConvert(
                      new Date(selectedShift.endTime)
                    )}`}
                  </span>
                  <div className="bg-slate-700 rounded-lg py-1 px-2  ">
                    {shiftClockEvents != undefined ? (
                      shiftClockEvents.map((event, index) => (
                        <div
                          key={index}
                          className={`text-white ${index == 0 && "pb-1"}`}
                        >
                          <span className="text-gray-100">
                            {eventOutputHandler(event.eventType)}
                          </span>
                          <span className="font-bold">
                            {tConvert(event.timestamp)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-red-400 font-bold py-1 px-2">
                        Did not clock in or Out
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
