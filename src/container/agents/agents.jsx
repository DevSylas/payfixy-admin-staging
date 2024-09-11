import React, { Fragment, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Pageheader from "../../components/common/pageheader/pageheader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AgentService } from "../../services/agents.service";
import { Badge } from "../../components/common/badge/badge";
import { ToggleActive } from "./toggleactive";
import Spinner from "../../components/custom/Spinner";
import ErrorMessage from "../../components/custom/ErrorMessage";

const Agents = () => {
  const [AgentsData, setAgentsData] = useState([]);
  const [verifyAgent, setVerifyAgent] = useState({
    agent_id: "",
  });

  const closeModalRef = useRef(null);

  const {
    data,
    refetch: refecthAllAgents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-agents"],
    queryFn: () => AgentService.getAllAgents(),
    onSuccess: () => {
      setAgentsData(data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => await AgentService.verifyAgent(data),
    onSuccess: () => {
      setActive((prevIsActive) => !prevIsActive);
      closeModalRef?.current.click();
    },
    onError: (error) => {
      console.error("Error creating admin:", error);
    },
  });
  const verify = useCallback(
    (e) => {
      e.preventDefault();
      mutate(verifyAgent);
    },
    [verifyAgent, mutate]
  );

  const changeHandler = useCallback(
    (e) => {
      setVerifyAgent({ ...verifyAgent, [e.target.name]: e.target.value });
    },
    [verifyAgent]
  );
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = (idToRemove) => {
    const updatedInvoiceData = AgentsData.filter(
      (item) => item.id !== idToRemove
    );
    setAgentsData(updatedInvoiceData);
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <ErrorMessage
        message={`Error: ${
          error?.response?.data ||
          "An unexpected error occured: Please try again"
        }`}
      />
    );

  return (
    <Fragment>
      <Pageheader currentpage="Agents" activepage="Pages" mainpage="Agents" />
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-12 col-span-12">
          <div className="box custom-box">
            <div className="box-header justify-between">
              <div className="box-title">
                Agents{" "}
                <span className="badge bg-light text-defaulttextcolor rounded-full ms-1 text-[0.75rem] align-middle">
                  {AgentsData.length + 1}
                </span>
              </div>
            </div>
            <div className="box-body !p-0">
              <div className="table-responsive">
                <table className="table whitespace-nowrap min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="text-start">
                        Agent Name
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
                      {/* <th scope="col" className="text-start">Verification</th> */}
                      <th scope="col" className="text-start ">
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
                                <img src={dats.profile_photo} alt="" />
                              </span>
                            </div>
                            <span className="block mb-1">{dats.firstname}</span>
                            <span className="block mb-1">{dats.lastname}</span>
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
                              <span className={`badge `}>{dats.status}</span>
                            </div>
                          </Badge>
                        </td>

                        {/* <td>
                                                    {idx.score}
                                                </td> */}
                        <td>
                          <div className="space-x-2 flex items-center">
                            <Link
                              to={`${import.meta.env.BASE_URL}agents/${
                                dats.id
                              }`}
                            >
                              <button
                                aria-label="button"
                                type="button"
                                className="ti-btn !py-1 !px-10 !text-[0.75rem] ti-btn-sm ti-btn-success-full"
                                data-hs-overlay="#hs-overlay-contacts"
                              >
                                View
                              </button>
                            </Link>
                            <div className="flex flex-wrap gap-2">
                              <Link
                                to="#"
                                className="hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                                data-hs-overlay="#todo-compose"
                              >
                                <i className="ri-add-line font-semibold align-middle"></i>
                                Verify Agents
                              </Link>
                            </div>

                            <ToggleActive
                              agentId={dats?.id}
                              isActive={dats.status === "active"}
                              refetchFn={refecthAllAgents}
                            />
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
      {/* modal */}
      <div id="todo-compose" className="hs-overlay hidden ti-modal">
        <div className="hs-overlay-open:mt-7 ti-modal-box !mt-32 ease-out">
          <div className="ti-modal-content">
            <div className="ti-modal-header">
              <h6
                className="modal-title text-[1rem] font-semibold text-defaulttextcolor"
                id="mail-ComposeLabel"
              >
                Verify Agent
              </h6>
              <button
                type="button"
                className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
                data-hs-overlay="#todo-compose"
                ref={closeModalRef}
              >
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="ti-modal-body px-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <label htmlFor="company-name" className="form-label">
                    Agent ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="aent_id"
                    name="agent_id"
                    placeholder="Agent Id"
                    value={verifyAgent.agent_id}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="ti-modal-footer">
              <button
                type="button"
                className="hs-dropdown-toggle ti-btn ti-btn-light align-middle"
                data-hs-overlay="#todo-compose"
              >
                Cancel
              </button>
              {!isPending && (
                <button
                  onClick={verify}
                  type="button"
                  className="ti-btn bg-primary text-white !font-medium"
                >
                  Verify Agent
                </button>
              )}
              {isPending && (
                <button
                  disabled
                  type="button"
                  className="ti-btn bg-secondary text-white !font-medium"
                >
                  Verify Agent
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Agents;
