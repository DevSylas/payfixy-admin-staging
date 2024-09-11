import axios from "axios";

const token = localStorage.getItem("token");
const cancelTokenSources = new Map();

const Axios = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

if (token) {
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Create a flag to indicate if it's a login attempt
let isLoginRequest = false;

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(handleAxiosError(error));
  }
);

export const setLoginRequestFlag = (flag) => {
  isLoginRequest = flag;
};

export default Axios;

function handleAxiosError(error) {
  const originalRequest = error.config;

  console.log("Error from handleAxiosError handler", error);

  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(`${data?.message}`);
        break;
      case 401:
        // try {
        //   await retryOriginalRequest(error, originalRequest);
        // } catch (retryError) {
        //   handleUnauthorized("test");
        // }

        if (localStorage.getItem("token")) localStorage.removeItem("token");
        if (!isLoginRequest) window.location.href = "/";

        break;
      case 404:
        toast.error(
          data?.message ||
            data?.msg ||
            "An unexpected error occured. Please try again later"
        );
        break;
      default:
        toast.error(
          `${data?.message}\n ${JSON.stringify(data?.errors)}` || error?.message
        );
        break;
    }
  } else if (error.request) {
    /* Write a custom handler */
  } else {
    /* Probably requestSetupError - Write a custom handler if the need arise */
  }

  /* For Debugging */
  return error;
}

async function refreshToken() {
  // API call to refresh the token and return it
  return null;
}

async function retryOriginalRequest(error, originalRequest) {
  if (!originalRequest) {
    throw new Error("Original request is missing");
  }

  try {
    const newToken = await refreshToken();
    if (newToken) {
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return axios(originalRequest);
    }
  } catch (refreshError) {
    console.error("Token refresh failed", refreshError);
  }

  throw error;
}

async function createRequestWithCancelToken(url, config = {}) {
  const source = axios.CancelToken.source();
  cancelTokenSources.set(url, source);

  const requestConfig = {
    ...config,
    cancelToken: source.token,
  };

  try {
    const response = await axios.get(url, requestConfig);
    cancelTokenSources.delete(url);
    return response;
  } catch (error) {
    cancelTokenSources.delete(url);
    if (axios.isCancel(error)) {
      console.error("Request canceled:", error.message);
    } else {
      // handleAxiosError(error);
    }
    throw error;
  }
}

function cancelRequest(url) {
  const source = cancelTokenSources.get(url);
  if (source) {
    source.cancel(`Request to ${url} has been canceled.`);
    cancelTokenSources.delete(url);
  }
}
