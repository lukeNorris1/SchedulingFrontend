import { useContext, useEffect, useState } from "react";
import { User } from "../../types/User";
import TimePicker from "./TimePicker";
import EmployeeSelect from "./EmployeeDropdown";
import RoleDropDown from "./RoleDropDown";
import UserContext from "../../context/UserContext";

interface Props {
  currentDate: Date;
  addShift: (shift: any) => void;
}

export default function RosterAddForm({ currentDate, addShift }: Props) {
  const [selectedEmployee, setSelectedEmployee] = useState<User | undefined>();
  const [selectedRole, setSelectedRole] = useState<number>();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [showEmployees, setShowEmployees] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setSelectedEmployee(undefined);
    if (showEmployees) return;
    if (
      startTime !== undefined &&
      endTime !== undefined &&
      selectedRole !== undefined
    ) {
      setShowEmployees(true);
    }
  }, [startTime, endTime, selectedRole]);

  function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const newErrors: string[] = [];

      if (!startTime) newErrors.push("Enter a Start time");
      if (!endTime) newErrors.push("Enter an End time");
      if (!selectedRole) newErrors.push("Enter a Role");
      if (!selectedEmployee) newErrors.push("Enter an Employee");
      if (!user?._id) newErrors.push("Invalid user, please login");
      if (startTime! > endTime!) newErrors.push("Start time has to be before finish")


      if (newErrors.length > 0) {
        throw newErrors;
      }


      startTime?.setDate(currentDate.getDate())
      startTime?.setMonth(currentDate.getMonth())
      startTime?.setFullYear(currentDate.getFullYear())
      endTime?.setDate(currentDate.getDate())
      endTime?.setMonth(currentDate.getMonth())
      endTime?.setFullYear(currentDate.getFullYear())


      const newShift = {
        createdBy: user?._id,
        employeeId: selectedEmployee?._id,
        employeeName: selectedEmployee?.fullName,
        employeeRole: selectedRole,
        employeePosition: selectedEmployee?.jobTitle,
        startTime: startTime,
        endTime: endTime,
      };


      addShift(newShift);
      setErrors([])
    } catch (error) {
      setErrors(error as string[]);
    }
  }

  return (
    <div className="mx-2 w-fit bg-slate-700 p-1 my-4 rounded-lg">
      <form className="p-4 bg-slate-800 text-white rounded-b-lg">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 ">
          {/* Left line of container */}
          <TimePicker
            title={"Start"}
            date={currentDate}
            onChange={(value: any) => {
              setStartTime(value); 
            }}
          />
          <TimePicker
            title={"End"}
            date={currentDate}
            onChange={(value: any) => {
              setEndTime(value);
            }}
          />
          {/* Right of container */}
          <RoleDropDown
            selectedRole={selectedRole}
            setRole={(value: number) => {
              setSelectedRole(value);
            }}
            filter="Admin"
          />
          <EmployeeSelect
            currentDate={currentDate}
            timePicked={showEmployees}
            selectedRole={selectedRole}
            selectedEmployee={selectedEmployee}
            setEmployee={(employee: User) => {
              setSelectedEmployee(employee);
            }}
          />
          {/* End of Body */}
          <button
            type="submit"
            className="border-2 border-gray-400 py-2 px-4 rounded-md hover:bg-white hover:text-black"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {errors?.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      </form>
    </div>
  );
}
