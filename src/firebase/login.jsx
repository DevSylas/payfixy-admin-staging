import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ThemeChanger } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import desktopdarklogo from "../assets/images/brand-logos/pay_logo.svg";
import { LocalStorageBackup } from "../components/common/switcher/switcherdata/switcherdata";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

const Login = ({ ThemeChanger }) => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    username: "", //cugwuh
    password: "", //password
  });
  const { username, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `${import.meta.env.BASE_URL}dashboards`;
    navigate(path);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => await authService.login(data),
    onSuccess: (data) => {
      routeChange();
    },
    onError: (error) => {
      console.log(error);
      setError("Login failed. Please try again.");
    },
  });

  const Login = (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      return setError("Please fill the required fields to login");
    }
    mutate(data);
  };

  useEffect(() => {
    LocalStorageBackup(ThemeChanger);
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
          <div className="flex flex-1 justify-center items-center">
            <div className="sm:p-5">
              <div className="mt-[1.5rem] sm:mt-0 mb-[1.5rem] flex justify-center">
                <Link to={`${import.meta.env.BASE_URL}dashboards/crm/`}>
                  <img
                    src={desktopdarklogo}
                    alt="logo"
                    className="desktop-logo"
                  />
                  {/* <img src={desktopdarklogo} alt="logo" className="desktop-dark" /> */}
                </Link>
              </div>

              <div className="box !p-[1rem] sm:!p-[3rem] !w-full sm:!w-[500px]">
                <div
                  className="box-body"
                  role="tabpanel"
                  id="pills-with-brand-color-02"
                  aria-labelledby="pills-with-brand-color-item-2"
                >
                  <p className="h5 font-semibold mb-2 text-center">Sign In</p>

                  {/* <p className="mb-4  dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back !</p> */}

                  {err && (
                    <div
                      className="alert-danger px-4 py-3 shadow-md mb-2"
                      role="alert"
                    >
                      <div className="flex justify-center">
                        <div className="py-1"></div>
                        <div>{err}</div>
                      </div>
                    </div>
                  )}
                  <form className="grid grid-cols-12 gap-y-4" onSubmit={Login}>
                    <div className="xl:col-span-12 col-span-12">
                      <label
                        htmlFor="signin-username"
                        className="form-label text-default"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        className="form-control form-control-lg w-full !rounded-md"
                        placeholder="user name"
                        value={username}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="xl:col-span-12 col-span-12 mb-2">
                      <label
                        htmlFor="signin-password"
                        className="form-label text-default block"
                      >
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          name="password"
                          type={passwordshow1 ? "text" : "password"}
                          className="form-control form-control-lg !rounded-s-md"
                          placeholder="password"
                          value={password}
                          onChange={changeHandler}
                        />
                        <button
                          onClick={() => setpasswordshow1(!passwordshow1)}
                          aria-label="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      <button
                        type="submit"
                        className={`ti-btn ti-btn-primary ${
                          !isPending ? "!bg-primary" : "!bg-secondary"
                        } !text-white !font-medium`}
                      >
                        {!isPending ? "Sign In" : "Signing in"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Login);
