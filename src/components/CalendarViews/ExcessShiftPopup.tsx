import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ShiftProps } from "../../types/Shift";
import { formatDate } from "../../utils/date";
import ExcessShift from "./ExcessShift";

interface props {
  shifts: ShiftProps[];
  openState: boolean;
  toggleOpen: any;
  setSelectedShift: React.Dispatch<React.SetStateAction<ShiftProps | null>>;
}

export default function ShiftOptions({
  shifts,
  openState,
  toggleOpen,
  setSelectedShift,
}: props) {
  if (!shifts) return null;

  return (
    <>
      <Transition appear show={openState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border-2 border-slate-600">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Shifts - {formatDate(shifts[0]?.startTime)}
                </Dialog.Title>
                <div className="flex flex-col mt-2 max-h-96 md:max-h-[300px] overflow-y-auto">
                  {shifts
                    .sort(
                      (a, b) =>
                        new Date(a.startTime).getTime() -
                        new Date(b.startTime).getTime()
                    )
                    .map((shift, i) => {
                      return (
                        <div
                          key={i}
                          className="min-w-[80%] md:w-[100%] hover:cursor-pointer"
                          onClick={() => setSelectedShift(shift)}
                        >
                          <ExcessShift
                            startTime={shift.startTime}
                            endTime={shift.endTime}
                            employeeId={shift.employeeId}
                          />
                        </div>
                      );
                    })}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-white bg-slate-700 border border-transparent rounded-md hover:bg-slate-800 duration-300"
                    onClick={toggleOpen}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
