import classNames from "classnames";

export const Badge = ({ children, status = "approved" }) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center  text-[12px] px-4 py-0.5  capitalize",
        {
          " text-[#D94F00] bg-[#D94F00]/10  rounded-lg": [
            "declined",
            "failed",
            "disabled",
            "suspended",
            "deactivated",
            "Debit",
            "overdue",
          ].includes(status),
          " text-[#389020] bg-[#389020]/10 border  rounded-lg": [
            "approved",
            "initiation",
            "authorisation",
            "authentication",
            "successful",
            "settled",
            "completed",
            "Credit",
            "Paid",
            "paid",
            "active",
          ].includes(status),
          "bg-blue-100 text-blue-500 ": status === "in progress",
          " text-[#FCD34D] border rounded-lg bg-[#FCD34D]/10 border-yellow-300": [
            "awaiting authorization",
            "Pending",
            "pending",
            "pending_approval",
            "queued",
            "awaiting_approval",
          ].includes(status),
        }
      )}
    >
      {children}
    </span>
  );
};
