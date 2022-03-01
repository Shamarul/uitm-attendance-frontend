import * as React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/dashboard";
import QrCodeScanner from "./routes/qrcodescanner";
import Cert from './routes/cert';
import {Provider} from 'react-redux';
import mySaga from './redux/sagas/Sagas';
import configureStore, {sagaMiddleware} from './redux/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryParamProvider } from 'use-query-params';

export const store = configureStore();
sagaMiddleware.run(mySaga);

const rootElement = document.getElementById("root");

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scanner" element={<QrCodeScanner />} />
          <Route path="cert" element={<Cert />} />
          <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
          />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
    <ToastContainer />
  </Provider>,
  rootElement
);