import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AgentService } from "../../services/agents.service";

export const ToggleActive = ({
  agentId,
  isActive: initialActiveState,
  refetchFn,
}) => {
  const [isActive, setActive] = useState(initialActiveState);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await AgentService.suspendAgentToggle(agentId, isActive),
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
      className={`w-fit text-xs  px-4 flex items-center justify-center gap-2 uppercase rounded-full h-[30px] ${
        !isActive ? "bg-emerald-800" : "bg-primary"
      } text-white  ${isActive ? "" : "flex-row-reverse pr-8"}`}
      disabled={isLoading}
    >
      <span className="block"> {!isActive ? "Suspend" : "Activate"}</span>
      <span
        className={`w-[10px] h-[10px] bg-gray-200 inset shadow-md rounded-full badge`}
      ></span>
      {isLoading && <span className="ml-2">Loading...</span>}
    </button>
  );
};
