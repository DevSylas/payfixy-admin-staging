import { Fragment, useState } from "react";
import Pageheader from "../../components/common/pageheader/pageheader";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import { TransactionService } from "../../services/transaction.service";
import { Badge } from "../../components/common/badge/badge";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Payments = () => {
  const [manageInvoiceData, setManageInvoiceData] = useState([]);
  const handleDelete = (idToRemove) => {
    const updatedInvoiceData = manageInvoiceData.filter(
      (item) => item.id !== idToRemove
    );
    setManageInvoiceData(updatedInvoiceData);
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-payment"],
    queryFn: () => TransactionService.getAllPayments(),
    onSuccess: () => {
      setManageInvoiceData(data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data : {error.response}</div>;

  return (
    <Fragment>
      <Pageheader
        currentpage="Payments"
        activepage="Pages"
        mainpage="Payments"
      />
      <div className="grid grid-cols-12 gap-6">
        <div className=" col-span-12">
          <div className="box custom-box">
            <div className="box-header justify-between">
              <div className="box-title">Payments</div>
              <div className="flex flex-wrap gap-2">
                <div>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    aria-label=".form-control-sm example"
                  />
                </div>
              </div>
            </div>
            <div className="box-body">
              <div className="table-responsive rounded-md">
                <table className="table whitespace-nowrap min-w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col" className="text-start">
                        Service Type
                      </th>
                      <th scope="col" className="text-start">
                        Transaction Type
                      </th>
                      <th scope="col" className="text-start">
                        Customer
                      </th>
                      <th scope="col" className="text-start">
                        Date
                      </th>
                      <th scope="col" className="text-start">
                        Amount
                      </th>
                      <th scope="col" className="text-start">
                        Commission
                      </th>
                      <th scope="col" className="text-start">
                        Status
                      </th>
                      <th scope="col" className="text-start">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((idx) => {
                      const altColor = idx.id % 2 === 0;
                      return (
                        <tr
                          className={`border-none ${
                            altColor && "bg-neutral-100 dark:bg-neutral-700"
                          } border-defaultborder transaction cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-800`}
                          key={idx.id}
                        >
                          <td></td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">
                                {idx.service_type}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>{idx.transaction_type}</span>
                          </td>
                          <td>
                            <span className={`text-${idx.color1}`}>
                              {idx.customer_name}
                            </span>
                          </td>
                          <td>
                            <span>
                              {new Date(idx.transaction_date).toDateString()}
                            </span>
                          </td>
                          <td>
                            <span className={`text-${idx.color1}`}>
                              ₦{idx.amount}
                            </span>
                          </td>

                          <td>
                            <span>₦{idx.commission_earned}</span>
                          </td>
                          <td>
                            <Badge status={idx.status}>
                              <span className={`badge`}>{idx.status}</span>
                            </Badge>
                          </td>
                          <td>
                            <div className="space-x-2 rtl:space-x-reverse">
                              <div className="hs-tooltip ti-main-tooltip">
                                <Link
                                  to={`${import.meta.env.BASE_URL}payments/${
                                    idx.id
                                  }`}
                                >
                                  <button
                                    type="button"
                                    className="hs-tooltip-toggle ti-btn ti-btn-primary ti-btn-sm"
                                  >
                                    <span>
                                      <i className="ri-eye-line"></i>
                                    </span>
                                    <span
                                      className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                      role="tooltip"
                                    >
                                      View
                                    </span>
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box-footer">
              <nav aria-label="Page navigation">
                <ul className="ti-pagination flex gap-3 items-center justify-center mb-4">
                  <li className="page-item disabled">
                    <Link
                      className="px-3 py-[0.375rem] flex items-center gap-3"
                      to="#"
                    >
                      <IoIosArrowRoundBack className="text-xl" />
                      <span>Previous</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="page-link px-3 py-[0.375rem] active"
                      to="#"
                    >
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link px-3 py-[0.375rem]" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link px-3 py-[0.375rem]" to="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="px-3 py-[0.375rem] flex items-center gap-3"
                      to="#"
                    >
                      <span>Next</span>
                      <IoIosArrowRoundForward className="text-xl" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Payments;
