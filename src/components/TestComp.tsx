import React, { useState } from 'react';
import { ROLES, User, getHighestRole } from '../types/User';

type DropdownItem = {
  id: number;
  label: string;
};

interface RoleProps {
    employee: User;
    role: number;
    setRole: (value: number) => void;
}

export default function TestComp({ employee, setRole }: RoleProps)  {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const dropdownItems: DropdownItem[] = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {role ? getHighestRole(role) : 'Select an item'}
        <svg
          className={`absolute w-5 h-5 text-gray-400 right-3 top-3 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <button onClick={() => {console.log(`roles; ${getHighestRole(role)}`)}}>test</button>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-sm">
          {dropdownItems.map((item) => (
            <div
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setRole(1)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

