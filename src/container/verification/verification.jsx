import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Pageheader from "../../components/common/pageheader/pageheader";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../../components/common/badge/badge";
import { VerificationService } from "../../services/verification.service";
import Spinner from "../../components/custom/Spinner";
import ErrorMessage from "../../components/custom/ErrorMessage";
import { format } from "date-fns";

const Verifications = () => {
  const [verificationsData, setVerificationsData] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-verifications"],
    queryFn: () => VerificationService.getAllVerifications(),
    onSuccess: () => {
      setVerificationsData(data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    },
  });

  if (isLoading) return <Spinner />;
  if (error)
    return <ErrorMessage message={`Error loading data: ${error?.response}`} />;

  return (
    <Fragment>
      <Pageheader
        currentpage="Verifications"
        activepage="Pages"
        mainpage="Verifications"
      />
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-12 col-span-12">
          <div className="box custom-box">
            <div className="box-header justify-between">
              <div className="box-title">
                Verifications{" "}
                <span className="badge bg-light text-defaulttextcolor rounded-full ms-1 text-[0.75rem] align-middle">
                  {verificationsData.length}
                </span>
              </div>
            </div>
            <div className="box-body !p-0">
              <div className="table-responsive">
                <table className="table whitespace-nowrap min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="text-start">
                        Full Name
                      </th>
                      <th scope="col" className="text-start">
                        Email
                      </th>
                      <th scope="col" className="text-start">
                        Phone
                      </th>
                      <th scope="col" className="text-start">
                        Status
                      </th>
                      <th scope="col" className="text-start">
                        Status Status
                      </th>
                      <th scope="col" className="text-start">
                        Verification Type
                      </th>
                      <th scope="col" className="text-start">
                        Updated At
                      </th>
                      <th scope="col" className="text-start">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((dats) => (
                      <tr
                        className="border border-defaultborder crm-contact"
                        key={dats.id}
                      >
                        <td>
                          <div className="flex items-center gap-x-2">
                            <div className="leading-none">
                              <span className="avatar avatar-sm p-1 bg-light avatar-rounded">
                                <img
                                  src={`data:image/jpeg;base64,${dats.photo}`}
                                />
                              </span>
                            </div>
                            <span className="block mb-1">
                              {dats.firstname} {dats.lastname}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-x-2">
                            <span className="block mb-1">
                              <i className="ri-mail-line me-2 align-middle text-[.875rem] text-[#8c9097] dark:text-white/50 inline-flex"></i>
                              {dats.email}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span className="block">
                              <i className="ri-phone-line me-2 align-middle text-[.875rem] text-[#8c9097] dark:text-white/50 inline-flex"></i>
                              {dats.phone_number}
                            </span>
                          </div>
                        </td>
                        <td>
                          <Badge status={dats.status}>
                            <div className="flex items-center flex-wrap gap-1">
                              <span className={`badge`}>{dats.status}</span>
                            </div>
                          </Badge>
                        </td>
                        <td>
                          <Badge status={dats.status}>
                            <div className="flex items-center flex-wrap gap-1">
                              <span className={`badge`}>
                                {dats.status_status}
                              </span>
                            </div>
                          </Badge>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {dats.verification_type}
                            </div>
                          </div>
                        </td>
                        <td>
                          {format(new Date(dats.created_at), "dd MMMM yyyy")}
                        </td>

                        <td>
                          <div className="space-x-2 rtl:space-x-reverse">
                            <div className="hs-tooltip ti-main-tooltip">
                              <Link
                                to={`${import.meta.env.BASE_URL}verifications/${
                                  dats.id
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box-footer !border-t-0">
              <div className="flex items-center">
                <div>
                  Showing 10 Entries{" "}
                  <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                </div>
                <div className="ms-auto">
                  <nav
                    aria-label="Page navigation"
                    className="pagination-style-4"
                  >
                    <ul className="ti-pagination mb-0">
                      <li className="page-item disabled">
                        <Link className="page-link" to="#">
                          Prev
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link className="page-link active" to="#">
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link text-primary" to="#">
                          next
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Verifications;
