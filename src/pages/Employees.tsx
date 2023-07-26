import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { User, getHighestRole } from "../types/User";
import { DB_URL } from "../utils/dbString";
import {
  EditSvg,
  DeleteSvg,
  ScheduleSvg,
  EmployeeSchedule,
} from "../components/Employee/index";
import ConfirmationModal from "../components/ConfirmationModal";
import AddSvg from "../components/Employee/AddSvg";
import allEmployees from "../mock_data/AllEmployees";

export default function Employees() {
  const { user } = useContext(UserContext);
  const [employees, setEmployees] = useState<any[]>(allEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const navigate = useNavigate();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);

  const deleteEmployee = async () => {
    setSelectedEmployee(null);
    setShowDeletePopup(false);
  };

  return (
    <div className="max-w-[90%] md:max-w-5xl mx-auto">
      <div className="">
        <div className="text-4xl text-white l-10 mt-10 mb-4">
          Employee Management
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between text-black text-xl text-left pb-2">
            <input
              type="search"
              className="w-1/5 px-2 py-1 text-white bg-slate-800 border-none rounded-md shadow-sm appearance-none focus:outline-none "
              placeholder="Search"
              onChange={(e) =>
                setSearchFilter(e.currentTarget.value.toLocaleLowerCase())
              }
            ></input>
            <div className="flex items-end justify-center relative h-12 w-13  pr-2 hover:cursor-pointer">
              {/* Updated container */}
              <div
                className="border-2 p-[4px] border-slate-600 hover:border-white rounded-full"
                onClick={() => navigate("/admin/employees/add")}
              >
                {/* Positioned at the bottom */}
                <AddSvg />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto shadow-md rounded-md md:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="[&>th]:py-3 [&>*]:px-6 [&>*]:text-xs [&>*]: [&>*]:tracking-wider [&>*]:text-left [&>*]:text-gray-700 [&>*]:uppercase [&>*]:dark:text-gray-400">
                      <th scope="col">Details</th>
                      <th scope="col">Position</th>
                      <th scope="col">Pay Rate</th>
                      <th scope="col">Role</th>
                      <th className="!text-center" scope="col">
                        Availability
                      </th>
                      <th className="!text-center" scope="col">
                        Edit
                      </th>
                      <th className="!text-center" scope="col">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees ? (
                      employees
                        ?.sort(
                          (a, b) => Math.max(...a.roles) - Math.max(...b.roles)
                        )
                        .filter((employee) =>
                          employee.fullName
                            .toLocaleLowerCase()
                            .includes(searchFilter)
                        )
                        .map((employee, index) => (
                          <tr
                            key={index}
                            className="bg-white hover:bg-gray-100 dark:text-gray-200 dark:bg-slate-700  dark:hover:bg-gray-800 [&>*]:text-start"
                          >
                            <td className="flex flex-col py-4 px-6 text-sm light:text-black whitespace-nowrap">
                              <div>
                                {employee.fullName}
                                <br />
                                {employee.email}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                              {`${
                                employee.jobTitle
                                  ? employee.jobTitle
                                  : "Unavailable"
                              }`}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              {`$${employee.payRate}`}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              {`${getHighestRole(Math.max(...employee.roles))}`}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                              <span
                                className="flex justify-center pl-2 pr-1 hover:cursor-pointer"
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setShowSchedulePopup(true);
                                }}
                              >
                                <ScheduleSvg />
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                              <span
                                className="flex justify-center pl-2 pr-1 hover:cursor-pointer"
                                onClick={() =>
                                  navigate(`/admin/employees/${employee._id}`)
                                }
                              >
                                <EditSvg />
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                              <span
                                className="flex justify-center pl-1 pr-2 hover:cursor-pointer"
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setShowDeletePopup(true);
                                }}
                              >
                                <DeleteSvg />
                              </span>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td>No employees</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSchedulePopup && (
        <EmployeeSchedule
          employeeState={selectedEmployee}
          setEmployeeState={setSelectedEmployee}
          onCancel={() => setShowSchedulePopup(false)}
        />
      )}
      {showDeletePopup && (
        <ConfirmationModal
          employee={selectedEmployee}
          onDelete={deleteEmployee}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
}
