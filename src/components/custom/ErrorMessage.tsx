import React from "react";

const ErrorMessage = ({
  className,
  message = "Operation Failed: an error has occured",
}) => {
  return (
    <div
      className={`alert-danger px-4 py-3 shadow-md my-2 ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1"></div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default ErrorMessage;
