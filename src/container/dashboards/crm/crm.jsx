import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sourcedata } from './crmdata';
import { DashboardWidgetsServices } from '../../../services/desktopwidgets.service';
import { useQuery } from '@tanstack/react-query';


const Crm = () => {
  // for User search function
  const [Data, setData] = useState(null);

const formatCurrency = (value) => `₦${(value ?? 0).toLocaleString()}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-dashboard"],
    queryFn: () => DashboardWidgetsServices.getDashboardWidget(),
    onSuccess: (data) => {
      setData(data?.total_payments_total);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.response.data);
    }
  });
  useEffect(() => {
    if (data) {
      setData(data?.total_payments_total);
    }
  }, [data]);

  const updateData = (payment) => {

    switch (payment) {
      case "day":
        setData(data?.total_payments_day);
        break;
      case "week":
        setData(data?.total_payments_week);
        break;
      case "month":
        setData(data?.total_payments_month);
        break;
      default:
        setData(data?.total_payments_total);
    }
  };

  return (
    <Fragment>
      <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">Welcome !</p>
        </div>
        <div className="btn-list md:mt-0 mt-2">
          {/* <button type="button"
            className="ti-btn bg-primary text-white btn-wave !font-medium !me-[0.375rem] !ms-0 !text-[0.85rem] !rounded-[0.35rem] !py-[0.51rem] !px-[0.86rem] shadow-none mb-0">
            <i className="ri-filter-3-fill  inline-block"></i>Filters
          </button> */}

        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-8 xl:col-span-12  col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12  xl:col-span-12  col-span-12">
              <div className="grid grid-cols-12 gap-x-6">
                <div className=" xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary">
                            <i className="ti ti-wallet text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Wallet Balance</p>
                              <h4 className="font-semibold  text-[1.5rem] !mb-2 ">{formatCurrency(data?.total_wallet_balance)}</h4>
                            </div>
                            <div id="crm-total-customers">
                              {/* <Totalcustomers/> */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between !mt-1">
                            <div>
                              <Link className="text-primary font-[500] text-[14px]" to="#">View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i>
                              </Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-cyan">
                            <i className="ti ti-wallet text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Total Commission</p>
                              <h4 className="font-semibold  text-[1.5rem] !mb-2 ">{formatCurrency(data?.total_commission)}</h4>
                            </div>
                            <div id="crm-total-customers">
                              {/* <Totalcustomers/> */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between !mt-1">
                            <div>
                              <Link className="text-cyan font-[500] text-[14px]" to={`${import.meta.env.BASE_URL}commissions`}>View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-purple">
                            <i className="ti ti-users text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Total Customers</p>
                              <h4 className="font-semibold  text-[1.5rem] !mb-2 ">{data?.admin_count}</h4>
                            </div>
                            <div id="crm-total-customers">
                              {/* <Totalcustomers/> */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between !mt-1">
                            <div>
                              <Link className="text-purple text-[0.813rem]" to={`${import.meta.env.BASE_URL}admins`}>View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            {/* <div className="text-end">
                                  <p className="mb-0 text-success text-[0.813rem] font-semibold">+40%</p>
                                  <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                                </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-secondary">
                            <i className="ti ti-wallet text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Total Agents</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">{data?.agent_count}</h4>
                            </div>
                            <div id="crm-total-revenue">
                              {/* <Totalrevenue /> */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link className="text-secondary text-[0.813rem]" to={`${import.meta.env.BASE_URL}agents`}>View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            {/* <div className="text-end">
                                  <p className="mb-0 text-success text-[0.813rem] font-semibold">+25%</p>
                                  <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                                </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-success">
                            <i className="ti ti-wave-square text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Support Ticket</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">{data?.support_ticket_count}</h4>
                            </div>
                            <div id="crm-conversion-ratio">
                              {/* <Conversionratio/> */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link className="text-success text-[0.813rem]" to={`${import.meta.env.BASE_URL}support-tickets`}>View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            {/* <div className="text-end">
                                  <p className="mb-0 text-danger text-[0.813rem] font-semibold">-12%</p>
                                  <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                                </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-warning">
                            <i className="ti ti-briefcase text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Total Transactions</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">{data?.transaction_count}</h4>
                            </div>
                            <div id="crm-total-deals">
                              {/* <Totaldeals/> */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link className="text-warning text-[0.813rem]" to={`${import.meta.env.BASE_URL}transaction`}>View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 xl:col-span-12  col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">
                    Total Payments
                  </div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link aria-label="anchor" to="#"
                      className="flex items-center justify-center w-[1.75rem] h-[1.75rem] ! !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                      aria-expanded="false">
                      <i className="fe fe-more-vertical text-[0.8rem]"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                      <li onClick={() => updateData("day")} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block cursor-pointer"
                      >Today</li>
                      <li onClick={() => updateData("week")} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block cursor-pointer"
                      >This Week</li>
                      <li onClick={() => updateData("month")} className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block cursor-pointer"
                      >This Month</li>
                    </ul>
                  </div>
                </div>
                <div className="box-body overflow-hidden">
                  <div className="leads-source-chart flex items-center justify-center">
                    <Sourcedata />
                    <div className="lead-source-value ">
                      <span className="block text-[0.875rem] ">Total Payment</span>
                      <span className="block text-[1.5625rem] font-bold">{formatCurrency(Data)}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-t border-dashed dark:border-defaultborder/10">
                  <div className="col !p-0">
                    <div className="!ps-4 p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend mobile inline-block">Day
                      </span>
                      <div><span className="text-[1rem]  font-semibold">{formatCurrency(data?.total_payments_day)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend desktop inline-block">Week
                      </span>
                      <div><span className="text-[1rem]  font-semibold">{formatCurrency(data?.total_payments_week)}</span></div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend laptop inline-block">Month
                      </span>
                      <div><span className="text-[1rem]  font-semibold">{formatCurrency(data?.total_payments_month)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="!pe-4 p-[0.95rem] text-center">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend tablet inline-block">TOtal
                      </span>
                      <div><span className="text-[1rem]  font-semibold">{formatCurrency(data?.total_payments_total)}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="transition fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 opacity-0 hidden"></div>
    </Fragment>
  );
}

export default Crm;
