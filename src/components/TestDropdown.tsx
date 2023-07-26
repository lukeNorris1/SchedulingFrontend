import React, { useState, useRef, useEffect } from 'react';

type DropdownProps = {
  buttonContent: React.ReactNode;
  dropdownContent: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ buttonContent, dropdownContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const calculateDropdownPosition = () => {
    if (dropdownRef.current) {
      const { top, bottom } = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - bottom;
      const spaceAbove = top;

      if (spaceBelow >= dropdownRef.current.offsetHeight || spaceAbove < dropdownRef.current.offsetHeight) {
        return 'below';
      }

      return 'above';
    }

    return 'below';
  };

  const dropdownPosition = calculateDropdownPosition();

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        {buttonContent}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${dropdownPosition === 'below' ? 'top-full' : 'bottom-0'} left-0 bg-white shadow-lg p-4 rounded`}
          style={{ transform: dropdownPosition === 'below' ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
