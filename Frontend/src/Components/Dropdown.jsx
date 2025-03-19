import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ShoppingCart from './ShoppingCart';

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC key to close the dropdown
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {isOpen && <DropdownBG closeDropdown={() => setIsOpen(false)} />}

      {/* Button to toggle the dropdown */}
      <button
        onClick={() => setIsOpen((state) => !state)}
        className="relative"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
      >
        {children}
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute bg-white w-[450px] right-0 z-10 mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-10">
          <div className="py-1">
            <ShoppingCart setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownBG = ({ closeDropdown }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30" onClick={closeDropdown} />,
    document.querySelector('#modal')
  );
};

export default Dropdown;
