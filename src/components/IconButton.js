import React from "react";

const IconButton = ({
  children,
  onClick,
  title = "",
  ariaLabel = "",
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-opacity-10 hover:bg-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
