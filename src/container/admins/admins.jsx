import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Pageheader from "../../components/common/pageheader/pageheader";
import { AdminService } from "../../services/admin.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, formatDate, parseISO } from "date-fns";
import { Badge } from "../../components/common/badge/badge";
import { ToggleActive } from "./toggleactive";
import Spinner from "../../components/custom/Spinner";
import ErrorMessage from "../../components/custom/ErrorMessage";
import useSelectedRows from "../../hooks/useSelecetedRow";

const Admins = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manageAdminData, setManageAdminData] = useState([]);
  const [isAllRowsSelected, setIsAllRowsSelected] = useState(false);

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
  });

  const [passwordShow, setPasswordShow] = useState(false);

  const closeModalRef = useRef(null);
  const { toggleSelectAll, toggleRowSelection, selectedRows } =
    useSelectedRows();
  const {
    data,
    isLoading,
    refetch: refetchAdmins,
    error,
  } = useQuery({
    queryKey: ["get-admin"],
    queryFn: () => AdminService.getAllAdmins(),
    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => await AdminService.createAdmin(data),
    onSuccess: () => {
      setAdminDetails({ username: "", password: "" });
      closeModalRef.current.click();
      refetchAdmins();
    },
    onError: (error) => {
      console.error("Error creating admin:", error);
    },
  });

  useEffect(() => {
    if (data) setManageAdminData(data);
  }, [data]);

  const create = useCallback(
    (e) => {
      e.preventDefault();
      mutate(adminDetails);
    },
    [adminDetails, mutate]
  );

  const changeHandler = useCallback(
    (e) => {
      setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
    },
    [adminDetails]
  );

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <ErrorMessage
        message={
          `Error: ${error?.response?.data}` ||
          "An unexpected error occured: Please try again"
        }
      />
    );

  return (
    <Fragment>
      <>
        <Pageheader currentpage="Admins" activepage="Pages" mainpage="Admins" />
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-12 col-span-12">
            <div className="box custom-box">
              <div className="box-header justify-between">
                <div className="box-title">
                  Admin{" "}
                  <span className="badge bg-light text-defaulttextcolor rounded-full ms-1 text-[0.75rem] align-middle">
                    {data?.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="hs-dropdown-toggle ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem]"
                    data-hs-overlay="#todo-compose"
                  >
                    <i className="ri-add-line font-semibold align-middle"></i>
                    Add Admin
                  </button>
                </div>
              </div>
              <div className="box-body !p-0">
                <div className="table-responsive">
                  <table className="table whitespace-nowrap min-w-full">
                    <thead>
                      <tr>
                        <th scope="col">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkboxNoLabel"
                            value={isAllRowsSelected}
                            onChange={() =>
                              setIsAllRowsSelected(!isAllRowsSelected)
                            }
                            aria-label="..."
                            onClick={() =>
                              toggleSelectAll(
                                manageAdminData,
                                isAllRowsSelected
                              )
                            }
                          />
                        </th>
                        <th scope="col" className="text-start text-lg">
                          Username
                        </th>
                        <th scope="col" className="text-start text-lg">
                          Status
                        </th>
                        <th scope="col" className="text-start text-lg">
                          Created At
                        </th>
                        <th scope="col" className="text-start text-lg">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {manageAdminData?.map((dats) => (
                        <tr
                          className="border border-defaultborder crm-contact"
                          key={dats.id}
                        >
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkboxNoLabel1"
                              checked={selectedRows
                                ?.map(({ id }) => id)
                                .includes(dats.id)}
                              onChange={() => toggleRowSelection(dats)}
                              aria-label="..."
                            />
                          </td>
                          <td>
                            <div className="flex items-center gap-x-2">
                              <span className="block mb-1">
                                {dats.username}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-x-2">
                              <Badge status={dats.role}>
                                <div className="flex items-center flex-wrap gap-1">
                                  <span className="">
                                    {dats.role === "admin"
                                      ? "Inactive"
                                      : dats.role}
                                  </span>
                                </div>
                              </Badge>
                            </div>
                          </td>
                          <td>
                            {format(parseISO(dats.created_at), "dd MMMM yyyy")}
                          </td>
                          <td>
                            <ToggleActive
                              adminId={dats.id}
                              isActive={dats.role === "active"}
                              status={dats.role}
                              refetchFn={refetchAdmins}
                            />
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
                            Next
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
        <div id="todo-compose" className="hs-overlay hidden ti-modal">
          <div className="hs-overlay-open:mt-7 ti-modal-box !mt-32 ease-out">
            <div className="ti-modal-content">
              <div className="ti-modal-header">
                <h6
                  className="modal-title text-[1rem] font-semibold text-defaulttextcolor"
                  id="mail-ComposeLabel"
                >
                  Add Admin
                </h6>
                <button
                  type="button"
                  ref={closeModalRef}
                  className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
                  data-hs-overlay="#todo-compose"
                >
                  <span className="sr-only">Close</span>
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <div className="ti-modal-body px-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <label htmlFor="company-name" className="form-label">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="User Name"
                      value={adminDetails.username}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="col-span-12">
                    <label htmlFor="company-lead-score" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordShow ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={adminDetails.password}
                        onChange={changeHandler}
                      />
                      <button
                        onClick={() => setPasswordShow(!passwordShow)}
                        aria-label="button"
                        className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                        type="button"
                        id="button-addon2"
                      >
                        <i
                          className={`${
                            passwordShow ? "ri-eye-line" : "ri-eye-off-line"
                          } align-middle`}
                        ></i>
                      </button>
                    </div>
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
                    onClick={create}
                    type="submit"
                    className={`ti-btn ${
                      !isPending ? "bg-primary" : "bg-secondary"
                    } text-white !font-medium`}
                  >
                    {!isPending ? "Create Admin" : "Creating Admin"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
};

export default Admins;
