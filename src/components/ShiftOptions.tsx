import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { ShiftProps } from "./../types/Shift";
import { formatDate, tConvert } from "../utils/date";
import { DB_URL } from "../utils/dbString";

interface PopupProps {
  selectedShift: ShiftProps | null;
  setSelectedShift: React.Dispatch<React.SetStateAction<ShiftProps | null>>;
  removeShift?: any;
}

export default function Popup({
  selectedShift,
  setSelectedShift,
  removeShift,
}: PopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  function closeModal() {
    setSelectedShift(null);
    setIsOpen(false);
  }

  async function editShift() {
    const url = `${DB_URL}/shifts/edit/${selectedShift?._id}/available`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    removeShift(selectedShift);
    closeModal();
  }

  if (!selectedShift) return <></>;

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
              <Dialog.Panel className="flex flex-col w-[95%] md:w-[50%] transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="text-2xl font-bold text-blue-700 mb-2">
                    {`${formatDate(selectedShift.startTime)}`}
                  </div>
                  <div className="text-lg text-gray-600">
                    {`${tConvert(selectedShift.startTime)} to ${tConvert(
                      selectedShift.endTime
                    )}`}
                  </div>
                  <button
                    className={`border-2 border-gray-500 p-2 rounded-lg mt-3 font-bold`}
                    onClick={toggleOpen}
                  >
                    Unable to make it?
                  </button>
                </Dialog.Title>
                {isOpen && (
                  <div className="flex flex-col justify-center items-center mt-4 ">
                    <div className="border-2 border-black text-black w-fit px-4 py-2 rounded-2xl">
                      <div>Pressing Confirm removes your shift</div>
                      <div className="flex gap-2 justify-center">
                        <button
                          className="border-2 w-fit border-gray-500 p-2 rounded-lg mt-3 font-bold hover:border-red-500"
                          onClick={editShift}
                        >
                          Confirm
                        </button>
                        <button
                          className="border-2 w-fit border-gray-500 p-2 rounded-lg mt-3 font-bold hover:border-blue-500"
                          onClick={toggleOpen}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
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
