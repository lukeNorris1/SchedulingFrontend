import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className=" w-1/3 py-2 space-y-4">
        <button
          className="bg-gray-800 text-white font-bold p-2 block w-full text-center rounded"
          onClick={() => navigate("/admin/roster/create")}
        >
          Create Schedule
        </button>
        <button
          className="bg-gray-800 text-white font-bold p-2 block w-full text-center rounded"
          onClick={() => navigate("/admin/roster/settings")}
        >
          Schedule Settings
        </button>
        <button
          className="bg-gray-800 text-white font-bold p-2 block w-full text-center rounded"
          onClick={() => navigate("/admin/employees")}
        >
          Employees
        </button>
        <button
          className="bg-gray-800 text-white font-bold p-2 block w-full text-center rounded"
          onClick={() => navigate("/admin/shifts/all")}
        >
          Employee Shifts
        </button>
      </div>
    </div>
  );
}
