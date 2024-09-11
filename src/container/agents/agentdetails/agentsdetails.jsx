import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Pageheader from "../../../components/common/pageheader/pageheader";
import { useQuery } from "@tanstack/react-query";
import { IoCopyOutline, IoLocationOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { ToggleActive } from "../toggleactive";
import { AgentService } from "../../../services/agents.service";
import { format } from "date-fns";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";

const AgentDetails = () => {
  const { id } = useParams();

  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-agentid", id],
    queryFn: () => AgentService.getOneAgent(id),
    enabled: !!id,

    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    },
  });

  const formattedDob = data ? format(new Date(data.dob), "dd MMMM yyyy") : "";

  return (
    <Fragment>
      <Pageheader
        currentpage="Agent Details "
        activepage="Agent"
        mainpage="Agent Details"
      />
      <div className="">
        <div className="flex flex-wrap gap-4 justify-center sm:justify-between mb-5 p-5 border bg-white dark:bg-neutral-800 border-[lightgray] shadow-sm !rounded-md">
          <div className="flex gap-3 items-center">
            <span className="avatar avatar-xl !rounded-full">
              <img
                src={data?.profile_photo}
                className="!rounded-full img-fluid"
                alt=""
              />
            </span>
            <div>
              <h4 className="font-bold text-xl mb-0 sm:flex items-center">
                <Link to="#">
                  {" "}
                  {data?.lastname}{" "}
                  <i
                    className="bi bi-check-circle-fill text-success text-[1rem]"
                    title="Verified candidate"
                  ></i>
                </Link>
              </h4>
              <span className="font-bold">
                <i className="bi bi-email"></i>
                {data?.email}
              </span>
            </div>
          </div>
          <div className="btn-list flex sm:justify-end ">
            <div className="sm:flex gap-3 btn-list">
              <p className="font-bold pt-1 text-lg">Suspend Agent</p>
              <ToggleActive
                agentId={data?.id}
                isActive={data?.status === "active"}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="box custom-box col-span-12 p-5 border border-[lightgray] !rounded-md">
            <h5 className="text-xl font-bold">Agent Profile Information:</h5>
            <div className="space-y-4 my-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <h6 className=" text-gray-500">Name</h6>
                  <span className="">{data?.lastname}</span>
                </div>
                <div className="col-span-1 flex flex-col flex-wrap">
                  <h6 className="text-sm font-medium text-gray-500">Email</h6>
                  <span className="">{data?.email}</span>
                </div>
                <div className="col-span-1">
                  <h6 className="text-sm font-medium text-gray-500">D.O.B</h6>
                  <span className="">{formattedDob}</span>
                </div>
                <div className="col-span-1">
                  <h6 className="text-sm font-medium text-gray-500">Mobile</h6>
                  <span className="">{data?.phone_number}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="space-y-4 my-4">
              <h4 className="text-sm font-semibold">Verification Details</h4>
              <div className="flex flex-col gap-4">
                <div className="">
                  <h6 className="text-sm font-medium text-gray-500">BVN</h6>
                  <span className="">{data?.lastname}</span>
                </div>
                <div className="">
                  <div className="flex items-center gap-2">
                    <h6 className="text-sm font-medium text-gray-500">Pin</h6>
                    {isCopied ? (
                      "Copied"
                    ) : (
                      <IoCopyOutline
                        className="text-md cursor-pointer"
                        onClick={() => copyToClipboard(data.pin)}
                      />
                    )}
                  </div>
                  <div className="p-4 w-full md:w-[85%] mt-2 bg-gray-200 rounded-md custom-scrollbar-hide hover:custom-scrollbar-default overflow-x-scroll">
                    <span className="text-wrap">{data?.pin}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 my-4">
              <h4 className="text-sm font-semibold">Address Details</h4>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <IoLocationOutline />
                  <div>
                    <h6 className="text-sm font-medium text-gray-500">
                      Address
                    </h6>
                    <span className="">{data?.home_address}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <CiGlobe />
                  <div>
                    <h6 className="text-sm font-medium text-gray-500">
                      Longitude
                    </h6>
                    <span className="">{data?.latitude}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <CiGlobe />
                  <div>
                    <h6 className="text-sm font-medium text-gray-500">
                      Latitude
                    </h6>
                    <span className="">{data?.longitude}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AgentDetails;
