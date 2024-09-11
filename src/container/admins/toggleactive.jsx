import React, { useEffect, useState } from "react";
import { AdminService } from "../../services/admin.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const ToggleActive = ({
  adminId,
  isActive: initialActiveState,
  status,
  refetchFn,
}) => {
  const [isActive, setActive] = useState(initialActiveState);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await AdminService.suspendAdminToggle(adminId, isActive),
    onSuccess: () => {
      setActive((prevIsActive) => !prevIsActive);
      refetchFn();
    },
    onError: (error) => {
      console.error("Error toggling admin status:", error);
      // Handle error (e.g., show error message to user)
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className={`w-fit text-[10px] font-[400] px-4 flex items-center justify-center gap-2 uppercase rounded-full h-[30px] ${
        isActive ? "bg-emerald-800" : "bg-primary"
      } text-white  ${isActive ? "" : "flex-row-reverse pr-8"}`}
      disabled={isLoading}
    >
      <span className="block text-[10px]">
        {" "}
        {isActive ? "Deactivate" : "Activate"}
      </span>
      <span
        className={`w-[15px] h-[15px] bg-gray-200 inset shadow-md rounded-full`}
      ></span>
      {isLoading && <span className="ml-2">Loading...</span>}
    </button>
  );
};
