import { createShift } from "../types/Shift";

const scheduleKey = "schedule";

export const saveScheduleToLocalStorage = (schedule: createShift[]) => {
  localStorage.setItem(scheduleKey, schedule);
};

export const loadScheduleFromLocalStorage = () => {
    const storedObj = localStorage.getItem(scheduleKey);
    const newObj = JSON.parse(storedObj)
  if (state) {
    return state;
  }
  return undefined;
};

