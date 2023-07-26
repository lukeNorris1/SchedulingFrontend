import React, { useEffect, useState } from "react";
import { User } from "../types/User";

interface props {
  employee?: User | null;
  onDelete: any;
  onCancel: any;
  prompt?: string;
  position?: string;
}

const ConfirmationModal = ({
  employee,
  onDelete,
  onCancel,
  prompt,
  position,
}: props) => {
  const [popCard, setPopCard] = useState("hidden");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    handleMenuClick();
  }, [employee]);

  const handleMenuClick = () => {
    setPopCard("inline-block");
    setFade(true);
  };

  const handleXClick = () => {
    setPopCard("hidden");
    setFade(false);
  };

  return (
    <div className="text-center z-40">
      <div className="">
        <div
          className={`transition-all duration-200    ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`fixed bottom-[${
              position ? position : "40"
            }%] inset-0 overflow-y-auto flex items-center justify-center`}
          >
            <div className="absolute flex flex-col justify-center text-left rounded-3xl border-black border-2 bg-white space-y-2 p-8 pr-32 text-3xl  pointer-events-auto">
              <h3 className="font-bold">Are you sure?</h3>
              <span className="text-sm">
                {prompt ? (
                  prompt
                ) : (
                  <div>
                    Confirm deletion of <b>{employee?.fullName}?</b>
                  </div>
                )}
              </span>
              <div className="">
                <button
                  className="text-lg text-white bg-slate-800 px-8 py-1 mr-2 rounded-md hover:text-slate-200"
                  onClick={() => {
                    handleXClick();
                    onDelete();
                  }}
                >
                  Yes
                </button>
                <button
                  className="text-lg text-white bg-slate-800 px-8 py-1 rounded-md hover:text-slate-200"
                  onClick={() => {
                    handleXClick();
                    onCancel();
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
