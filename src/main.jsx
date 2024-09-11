import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Crm from "./container/dashboards/crm/crm.jsx";
import "./index.scss";
import ScrollToTop from "./components/ui/scrolltotop.jsx";
import Agents from "./container/agents/agents.jsx";
import Transaction from "./container/transaction/transaction.jsx";
import Commissions from "./container/commissions/commissions.jsx";
import Admins from "./container/admins/admins.jsx";
import Login from "./firebase/login.jsx";
import Auth from "./firebase/auth.jsx";
import SupportTickets from "./container/supporttickects/supporttickets.jsx";
import Payments from "./container/payments/payments.jsx";
import AgentDetails from "./container/agents/agentdetails/agentsdetails.jsx";
import TransactionDetails from "./container/transaction/transactiondetails/transactiondetails.jsx";
import CommissionDetails from "./container/commissions/commissiondetails/commissiondetail.jsx";
import PaymentDetails from "./container/payments/paymentdetails/paymentdetails.jsx";
import Verifications from "./container/verification/verification.jsx";
import VerificationDetails from "./container/verification/verificationdetails/verificationdetails.jsx";
import Logout from "./firebase/logout.jsx";
import PrivateRoutesWrapper from "./components/PrivateRoutesWrapper.jsx";
import _404 from "./pages/_404.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <ErrorBoundary>
      <BrowserRouter>
        <React.Suspense>
          <ScrollToTop />
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
              <Route index element={<Login />} />
              <Route
                path={`${import.meta.env.BASE_URL}firebase/login`}
                element={<Login />}
              />
            </Route>
            <Route
              path={`${import.meta.env.BASE_URL}`}
              element={
                <PrivateRoutesWrapper>
                  <App />
                </PrivateRoutesWrapper>
              }
            >
              <Route
                path={`${import.meta.env.BASE_URL}dashboards`}
                element={<Crm />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}admins`}
                element={<Admins />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}agents`}
                element={<Agents />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}agents/:id`}
                element={<AgentDetails />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}transaction`}
                element={<Transaction />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}transaction/:id`}
                element={<TransactionDetails />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}commissions`}
                element={<Commissions />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}commissions/:id`}
                element={<CommissionDetails />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}support-tickets`}
                element={<SupportTickets />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}payments`}
                element={<Payments />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}payments/:id`}
                element={<PaymentDetails />}
              />
              <Route path="/verifications" element={<Verifications />} />
              <Route
                path="/verifications/:id"
                element={<VerificationDetails />}
              />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<_404 />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </React.Fragment>
);
