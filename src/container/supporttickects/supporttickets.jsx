import { Fragment } from "react";
import { Link } from "react-router-dom";
import Pageheader from "../../components/common/pageheader/pageheader";
import { useQuery } from "@tanstack/react-query";
import { AgentService } from "../../services/agents.service";
import { IoTicketOutline } from "react-icons/io5";

const SupportTickets = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-agents"],
    queryFn: () => AgentService.getAllSupportTickets(),
    onSuccess: () => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data : {error.response}</div>;

  return (
    <>
      <Fragment>
        <Pageheader
          currentpage="Support Tickets"
          activepage="Pages"
          mainpage="Support Ticket"
        />
        {!isLoading && !data?.length ? (
          <div className="flex flex-col h-[80vh] justify-center items-center">
            <IoTicketOutline className="text-4xl" />
            <div className="text-lg text-neutral-500 mt-4">
              No Tickets to Show
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex items-start gap-12 p-4 text-neutral-800 dark:text-[whitesmoke]">
              <div className="">
                <div className="text-sm md:text-lg mb-1 font-semibold">
                  All Tickets
                </div>
                <div className="w-12 h-1 bg-primary rounded-lg"></div>
              </div>
              <div className="">
                <div className="text-xs md:text-sm mb-1 font-semibold">
                  Open
                </div>
              </div>
              <div className="">
                <div className="text-xs md:text-sm mb-1 font-semibold">
                  Closed
                </div>
              </div>
            </div>
            <div className="max-w-6xl">
              <div className="grid grid-cols-12 sm:gap-x-6 my-4 mx-4">
                {data.map((idx) => (
                  <div
                    className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12"
                    key={idx.id}
                  >
                    <div className="box">
                      <div className="box-header">
                        <div className="flex align-center justify-between w-full">
                          <div className="my-auto">
                            <div className="text-[.9375rem] font-semibold">
                              {idx.full_name}
                            </div>
                            <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[.6875rem]">
                              {idx.phone}
                            </p>
                          </div>
                          <div className="italic font-semibold text-neutral-500 dark:text-white/50 text-[.775rem]">
                            {new Date(idx.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">{idx.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <nav aria-label="Page navigation">
                            <ul className="ti-pagination  mb-4 justify-end">
                                <li className="page-item disabled"><Link className="page-link px-3 py-[0.375rem]" to="#">Previous</Link></li>
                                <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                <li className="page-item"><Link className="page-link active px-3 py-[0.375rem]" to="#">2</Link></li>
                                <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link></li>
                            </ul>
                        </nav> */}
            </div>
          </div>
        )}
      </Fragment>
    </>
  );
};

export default SupportTickets;
