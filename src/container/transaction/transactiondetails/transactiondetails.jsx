import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { TransactionService } from "../../../services/transaction.service";
import Pageheader from "../../../components/common/pageheader/pageheader";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Badge } from "../../../components/common/badge/badge";
import { GrMoney } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { BsHash } from "react-icons/bs";

const TransactionDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-transactionid", id],
    queryFn: () => TransactionService.getTransaction(id),
    enabled: !!id,

    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    },
  });
  const formattedDate = data
    ? format(new Date(data.transaction_date), "dd MMMM yyyy")
    : "";
  const formatCurrency = (value) => `₦${(value ?? 0).toLocaleString()}`;

  return (
    <Fragment>
      <Pageheader
        currentpage="Transaction Details "
        activepage="Transactions"
        mainpage="Transaction Details"
      />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 order-first md:order-last">
          <div className="border h-full bg-white dark:bg-neutral-800 md:bg-transparent md:border-l-neutral-300 p-8 space-y-4 rounded-md">
            <div className="flex items-center gap-4">
              <FaRegUser className="text-lg" />
              <div>
                <h6 className=" gray-600  text-[14px]">Customers Name</h6>
                <p className="font-[500] text-xl">{data?.customer_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <IoCallOutline className="text-lg" />
              <div>
                <h6 className=" gray-600  text-[14px]">Phone Number</h6>
                <p className="font-[500] text-xl">{data?.mobile_number}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <BsHash className="text-lg" />
              <div>
                <h6 className=" gray-600  text-[14px]">Agent ID</h6>
                <p className="font-[500] text-xl">{data?.agent_id}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 mb-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 shadow-sm p-4 rounded-md bg-white dark:bg-neutral-600">
              <div className="flex justify-between">
                <div className="">
                  <div className="flex items-center gap-2">
                    <h3 htmlFor="" className="text-xl font-bold">
                      Amount
                    </h3>
                    <Badge status={data?.status}>{data?.status}</Badge>
                  </div>
                  <span className="block text-md">
                    {formatCurrency(data?.amount)}
                  </span>
                </div>
                <GrMoney className="text-primary" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 shadow-sm p-4 rounded-md bg-white dark:bg-neutral-600">
              <div className="flex justify-between">
                <div className="">
                  <h3 htmlFor="" className="text-xl font-bold">
                    Commission Earned
                  </h3>
                  <span className="block text-md">
                    {formatCurrency(data?.commission_earned)}
                  </span>
                </div>
                <GiTakeMyMoney className="text-primary text-xl" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 shadow-sm p-4 rounded-md bg-white dark:bg-neutral-600 space-y-4">
              <div>
                <h6 className=" gray-600  text-[12px]">Transaction Type</h6>
                <p className="font-[500] text-[14px] pt-1">
                  {data?.transaction_type}
                </p>
              </div>
              <div>
                <h6 className=" gray-600  text-[12px]">Service Type</h6>
                <p className="font-[500] text-[14px] pt-1">
                  {data?.service_type}
                </p>
              </div>
              <div>
                <h6 className=" gray-600  text-[12px]">Transaction ID</h6>
                <p className="font-[500] text-[14px] pt-1">
                  {data?.transaction_type}
                </p>
              </div>
              <div>
                <h6 className=" gray-600  text-[12px]">Transaction Date</h6>
                <p className="font-[500] text-[14px] pt-1">
                  {data?.transaction_date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionDetails;
