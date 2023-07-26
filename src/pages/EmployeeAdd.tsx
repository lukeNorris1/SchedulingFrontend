import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import { DB_URL } from "../utils/dbString";
import TimePicker from "../components/Employee/TimePicker";
import EmployeeRoleSelect from "../components/Employee/EmployeeRoleSelect";


export default function EmployeeAdd() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const parsedData = {
      ...data,
      roles: [parseInt(data.roles, 10)], // Convert the "roles" field to a number
      payRate: Number(data.payRate), // Convert the "payRate" field to a number
    };

    const url = `${DB_URL}/user/signup/`;
    try {
     await fetch(url, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });
    } catch (error) {
      console.log(error)
    } finally {
      navigate("/employees")
    }
  };

  return user ? (
    <div className="flex flex-col justify-center items-center mt-14">
      <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-8 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 flex">
        {/* Right Column */}
        <div className="">
          <div className="flex justify-between mb-6">
            <button
              className="text-black font-bold p-1 rounded-lg hover:bg-gray-600 hover:text-white"
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
                  {...register("fullName", {
                    required: "required",
                    minLength: {
                      value: 2,
                      message: "min length is 2",
                    },
                  })}
                />
              </div>
              <div className="w-1/2 pl-2">
                <EmployeeRoleSelect
                  label="roles"
                  register={register}
                  name="roles"
                  defaultValue={undefined}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <input
                  type="email"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  {...register("email")}
                />
              </div>
              <div className="w-1/2 pl-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <input
                  id="password"
                  type="password"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "min length is 8",
                    },
                  })}
                />
                {errors.fullName && (
                  <div role="alert" className="text-black dark:text-black mt-1">
                    {`Name: ${errors.fullName.message}`}
                  </div>
                )}
                {errors.password && (
                  <div role="alert" className="text-black dark:text-black mt-1">
                    {`Password: ${errors.password.message}`}
                  </div>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter pay rate"
                  step="0.01"
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
      <div className="bg-white rounded-lg shadow-md p-8 mt-6 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 flex flex-col">
        <div className="text-bold text-2xl font-medium">Availability</div>
        <div>
          <div className="">
            <Controller
              name="availability"
              control={control}
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
