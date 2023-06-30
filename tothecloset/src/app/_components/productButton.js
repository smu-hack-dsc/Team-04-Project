import { SquareFill } from 'react-bootstrap-icons';
import React, { useState } from 'react';

const Button = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <button
      type="button"
      className={`flex items-center text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-2 ${
        isClicked ? 'border-black' : 'border-gray-300'
      } focus:border-black focus:ring-2 focus:ring-gray-400 focus:outline-none`}
      onClick={handleClick}
    >
      <SquareFill size={24} className="mr-1" />
      <span>Black</span>
    </button>
  );
};

export default Button;
