import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownIcon } from '../../assets/icons.jsx';
import { COLORS } from '../../utils/constants';

const DeleteDropdown = ({ onDelete, type = "message", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-4 h-4 rounded hover:bg-[${COLORS.hoverBg}] transition-colors opacity-0 group-hover:opacity-100`}
        title={`Delete ${type}`}
      >
        <ArrowDownIcon className={`w-3 h-3 text-[${COLORS.textSecondary}]`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 top-6 bg-white border border-[${COLORS.border}] rounded-lg shadow-lg py-1 z-50 min-w-[120px]`}>
          <button
            onClick={handleDelete}
            className={`w-full px-3 py-2 text-left text-sm text-[${COLORS.error}] hover:bg-[${COLORS.errorBg}] transition-colors flex items-center space-x-2`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteDropdown;
