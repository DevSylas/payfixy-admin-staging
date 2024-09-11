
import { Outlet } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";
import { Fragment, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});
const Auth = () => {
    useEffect(() => {
		import("preline");

	}, []);
  return (
    
    <Fragment>
    <QueryClientProvider client={queryClient}>

            <Provider store={store}>
              <Outlet/>      
            </Provider>
    </QueryClientProvider>

    </Fragment>
  );
};

export default Auth;
