import { useState } from "react";
import MonthDay from "./MonthDay";
import { days, daysInMonth, firstDayOfMonth } from "../../utils/date";
import { ShiftProps } from "../../types/Shift";
import Popup from "./Popup";
import AdminPopup from "./AdminPopu";
import ExcessShiftPopup from "./ExcessShiftPopup";

interface props {
  propDate: Date;
  shifts: ShiftProps[];
  adminView?: boolean;
  removeShift?: (value: ShiftProps) => void;
}


export default function MonthView({ propDate, shifts, adminView, removeShift }: props) {
  const [currentDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState<ShiftProps | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)
  const [excessDayNum, setExcessDayNum] = useState<number | undefined>(undefined)

  const firstDay = firstDayOfMonth(propDate.getFullYear(), propDate.getMonth());
  const totalDays = daysInMonth(
    propDate.getFullYear(),
    propDate.getUTCMonth() + 1
  );
  const lastMonthDays = daysInMonth(
    propDate.getFullYear(),
    propDate.getMonth() - 1
  );

  function getTodayShifts(todayDate: number): any[] {
    if (shifts) {
      return shifts.filter((shift) => {
        const shiftDate = new Date(shift.startTime).getDate();
        if (shiftDate === todayDate) {
          return shift;
        }
      });
    }
    else return []
  }

  function toggleDropdown() {
    setPopupIsOpen((prev) => !prev);
  }

  return (
    <div className="grid grid-cols-7 bg-slate-700 text-black">
      {days.map((day) => (
        <div
          key={day}
          className="text-center text-md md:text-xl font-semibold text-white py-2 overflow-hidden"
        >
          <span className="hidden md:inline">{day}</span>
          <span className="inline md:hidden">{day.substring(0, 3)}</span>
        </div>
      ))}
      {Array.from({ length: (firstDay + 1) % 7 }, (_, i) => i).map((num) => (
        <MonthDay
          key={num}
          disabled={true}
          dayNum={lastMonthDays - firstDay + num}
        /> //shifts={lastMonthShifts}
      ))}
      {Array.from({ length: totalDays }, (_, i) => i + 1).map((num) => (
        <MonthDay
          eventAdd={setSelectedShift}
          key={num}
          dayNum={num}
          shifts={getTodayShifts(num)}
          today={
            num == propDate.getDate() &&
            propDate.getMonth() == currentDate.getMonth()
          }
          toggleDropdown={toggleDropdown}
          setDay={(value: number) => setExcessDayNum(value)}
        />
      ))}
      {Array.from(
        { length: (7 - ((firstDay + 1 + totalDays) % 7)) % 7 },
        (_, i) => i + 1
      ).map((num) => (
        <MonthDay key={num} disabled={true} dayNum={num} /> //shifts={nextMonthShifts}
      ))}
      {adminView ? (
        <AdminPopup
          selectedShift={selectedShift}
          setSelectedShift={setSelectedShift}
          removeShift={removeShift!}
        />
      ) : (
        <Popup
          selectedShift={selectedShift}
          setSelectedShift={setSelectedShift}
        />
      )}
      <ExcessShiftPopup shifts={excessDayNum ? getTodayShifts(excessDayNum) : []}  setSelectedShift={setSelectedShift} openState={popupIsOpen} toggleOpen={toggleDropdown}/>

    </div>
  );
}
