import React from "react";
import { MdError, MdOutlineKeyboardBackspace } from "react-icons/md";
import { NavLink } from "react-router-dom";

const _404 = () => {
  return (
    <div className="flex flex-col !h-[85vh] items-center justify-center">
      <div className="flex flex-col items-center">
        <MdError className="text-3xl md:text-5xl text-primary" />
        <div className="text-3xl md:text-5xl font-bold">404</div>
        <p className="text-lg text-primary">Page not found.</p>
        <NavLink
          to="/dashboards"
          className="mt-4 flex items-center gap-2 py-2 px-4 text-sm bg-primary text-neutral-100 rounded-sm font-medium"
        >
          <MdOutlineKeyboardBackspace />
          <span>Go Back To Dashboard</span>
        </NavLink>
      </div>
    </div>
  );
};

export default _404;
