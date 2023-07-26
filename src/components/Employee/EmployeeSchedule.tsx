import { Dialog, Transition } from "@headlessui/react";
import { User } from "../../types/User";
import { days } from "../../utils/date";
import React, { Fragment } from "react";
import { convertTo12Hour } from "../../utils/date";

interface employeeProps {
  employeeState: User | null;
  setEmployeeState: React.Dispatch<React.SetStateAction<User | null>>;
  onCancel: any
}

export default function EmployeeSchedule({
  employeeState,
  setEmployeeState,
  onCancel
}: employeeProps) {
  function closeModal() {
    setEmployeeState(null);
    onCancel();
  }


  if (!employeeState) return <></>;

  return (
    <>
      <Transition appear show={employeeState != null} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed bottom-[40%] inset-0 overflow-y-auto flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {/*//! if name ends in S just add ' instead of 's */}
                  <div className="font-bold text-xl pb-2 underline underline-offset-8">{`${employeeState.fullName}'s Availability`}</div>
                  {Object.entries(employeeState.availability).map(
                    ([dayIndex, times]) => {
                      const day = days[Number(dayIndex)];
                      if (times) {
                        return (
                          <div key={dayIndex} className="text-center">
                            {`${day}: ${convertTo12Hour(
                              times.start
                            )} - ${convertTo12Hour(times.end)}`}
                          </div>
                        );
                      } else {
                        return <React.Fragment key={dayIndex}></React.Fragment>;
                      }
                    }
                  )}
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
