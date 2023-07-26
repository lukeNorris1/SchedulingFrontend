import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ROLES } from "../../types/User";

interface EmployeeRoleSelectProps {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  defaultValue: string | undefined;
  filter?: string;
}

const EmployeeRoleSelect: React.FC<EmployeeRoleSelectProps> = ({ register, name, defaultValue, filter}) => {
  return (
    <>
      <select
        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register(name)} defaultValue={defaultValue ? ROLES[defaultValue] : "" }
      >
        {filter == undefined ? Object.keys(ROLES).map((role) => (
          <option key={role} value={ROLES[role]}>
            {role}
          </option>
        )) : Object.keys(ROLES).filter((role) => role !== filter).map((role) => (
          <option key={role} value={ROLES[role]}>
            {role}
          </option>
        ))}
      </select>
    </>
  );
};

export default EmployeeRoleSelect;
