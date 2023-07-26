import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import { getHighestRole } from "../types/User";
import TimePicker from "../components/Employee/TimePicker";
import EmployeeRoleSelect from "../components/Employee/EmployeeRoleSelect";
import allEmployees from "../mock_data/AllEmployees";

export default function EmployeeEdit() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();
  const [userData] = useState(allEmployees[1]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data)
    // const parsedData = {
    //   ...data,
    //   roles: [parseInt(data.roles, 10)], // Convert the "roles" field to a number
    //   payRate: parseFloat(data.payRate), // Convert the "payRate" field to a number
    // };

    // const url = `${DB_URL}/user/edit/${userData?._id}`;
    // const response = await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(parsedData),
    // });

    navigate("/admin/employees", { replace: true });
  };

  return user && userData ? (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 flex">
        {/* Left Column */}
        <div className="w-1/3 flex flex-col">
          <div className="mb-4">
            <img
              src="" // Replace with actual image URL
              alt="Profile Picture"
              className="rounded-full bg-blue-400 w-32 h-32 mx-auto"
            />
          </div>
          <div className="mb-4 text-center">
            <h2 className="text-lg font-semibold">{userData.fullName}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/3 pl-8 border-l border-gray-300">
          <div className="flex justify-between mb-6">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          {/* Start of Employee Inputs */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                  defaultValue={userData.fullName}
                  {...register("fullName")}
                />
              </div>
              <div className="w-1/2 pl-2">
                <EmployeeRoleSelect
                  label="roles"
                  register={register}
                  name="roles"
                  defaultValue={getHighestRole(Math.max(...userData?.roles))}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <input
                  type="email"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  defaultValue={userData.email}
                  {...register("email")}
                />
              </div>
              <div className="w-1/2 pl-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter job title"
                  defaultValue={userData.jobTitle}
                  {...register("jobTitle")}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2 mx-auto">
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter pay rate"
                  step="0.01"
                  defaultValue={userData.payRate}
                  {...register("payRate")}
                />
              </div>
            </div>
            <div className="text-right mt-8">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
              >
                Save Employee
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 mt-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 flex flex-col">
        <div className="text-bold text-2xl font-medium">Availability</div>
        <div>
          <div className="">
            <Controller
              name="availability"
              control={control}
              defaultValue={userData.availability}
              render={({ field }) => (
                <TimePicker
                  availability={field.value}
                  onAvailabilityChange={(dayId, startTime, endTime) => {
                    const updatedAvailability = { ...field.value };
                    updatedAvailability[dayId] = {
                      start: startTime,
                      end: endTime,
                    };
                    field.onChange(updatedAvailability);
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>Loading ...</>
  );
}
