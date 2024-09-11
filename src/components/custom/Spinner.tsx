import React from "react";

const Spinner = ({ className }) => {
  return (
    <div className="flex justify-center py-4">
      <div
        className={`${className}`}
        style={{
          width: "1rem",
          height: "1rem",
          border: "2px dashed #949eb7",
          borderRadius: 100,
          animation: "spin 1.5s linear infinite",
        }}
      ></div>
    </div>
  );
};

export default Spinner;
