import React, { useContext, useEffect, useState } from "react";
import { ShiftProps } from "../types/Shift";
import { useNavigate, useParams } from "react-router-dom";
import { DB_URL } from "../utils/dbString";
import EmployeeDropdown from "../components/Roster/EmployeeDropdown";
import { User } from "../types/User";
import RoleDropDown from "../components/Roster/RoleDropDown";
import TimePicker from "../components/Roster/TimePicker";
import { formatDate, tConvert } from "../utils/date";
import UserContext from "../context/UserContext";

interface editProps {}

export default function EditShift({}: editProps) {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [selectedShift, setSelectedShift] = useState<ShiftProps>();
  const [selectedEmployee, setSelectedEmployee] = useState<User>();
  const [selectedRole, setSelectedRole] = useState<number | undefined>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const navigate = useNavigate();

  async function getShiftDetails() {
    const url = `${DB_URL}/shifts/collect/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedShift(data);

        const startDate = new Date(data.startTime);
        setStartDate(startDate);
        const endDate = new Date(data.endTime);
        setEndDate(endDate);
      } else if (response.status === 404) {
        // No next shift found for the employee
        console.log("error");
      } else {
        // Handle other error cases
        console.log("Error:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getEmployeeDetails() {
    try {
      // Simulate API call to fetch user data
      const response = await fetch(
        `${DB_URL}/user/${selectedShift?.employeeId}`
      );
      const employee: User = await response.json();
      setSelectedEmployee(employee);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  function handleStartDateChange(value: Date) {
    setStartDate(value);
  }

  function handleEndDateChange(value: Date) {
    setEndDate(value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const url = `${DB_URL}/shifts/editOne/${id}`;

    if (!selectedShift) return;

    try {
      const parsedData = {
        createdBy: user!._id.toString(),
        employeeId: selectedEmployee?._id,
        startTime: startDate,
        endTime: endDate,
        note: selectedShift.note,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        navigate("/admin/shifts/all", { replace: true })
      } else if (response.status === 404) {
        // No next shift found for the employee
        console.log('error no shift found')
      } else {
        // Handle other error cases
        console.log("Error:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getShiftDetails();
  }, []);

  useEffect(() => {
    if (selectedShift && selectedShift.employeeId != undefined) {
      getEmployeeDetails();
    }
  }, [selectedShift]);

  if (!selectedShift) return <>Error</>;

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 flex">
        {/* Left Column */}
        <div className="w-1/3 flex flex-col justify-center [&>p]:text-gray-500">
          <span className="pb-2 font-bold">
            Shift Details
          </span>
          <p>{formatDate(selectedShift.startTime)}</p>
          <p>
            Employee:{" "}
            {selectedEmployee ? selectedEmployee?.fullName : "Available"}
          </p>
          <p>Starts - {tConvert(selectedShift.startTime)}</p>
          <p>Ends - {tConvert(selectedShift.endTime)}</p>
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-2 bg-gray-600 rounded-xl">
          {/* Start of Employee Inputs */}
          <form className="bg-slate-800 p-3 rounded-lg">
            <div className="flex justify-between mb-6">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => navigate('/admin/shifts/all')}
              >
                Back
              </button>
            </div>

            <div className="flex justify-center gap-8 mb-4  p-2">
              <div className=" text-white">
                <RoleDropDown
                  selectedRole={selectedRole}
                  setRole={(value) => setSelectedRole(value)}
                />
              </div>
              <div className="text-white">
                <EmployeeDropdown
                  selectedEmployee={selectedEmployee}
                  selectedRole={selectedRole}
                  currentDate={new Date()}
                  timePicked={true}
                  setEmployee={(value: User) => setSelectedEmployee(value)}
                />
              </div>
            </div>

            <div className="flex justify-center text-white items-center pl-4 ">
              <div className="w-44">
                <TimePicker
                  date={startDate}
                  onChange={handleStartDateChange}
                  title={"Start Time"}
                />
              </div>
              <div>
                <TimePicker
                  date={endDate}
                  onChange={handleEndDateChange}
                  title={"Finish Time"}
                />
              </div>
            </div>
            <div className="text-right mt-8">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
                onClick={handleSubmit}
              >
                Save Shift
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
