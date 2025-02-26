import { React, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./components/index.js";
import UserProtectedWrapper from "./components/user/UserProtectedWrapper.jsx";
import CaptainProtectedWrapper from "./components/captain/CaptainProtectedWrapper.jsx";
import SocketProvider from "./context/SocketContext.jsx";

import Home from "./pages/Home.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import UserHome from "./pages/UserHome.jsx";
import UserRiding from "./pages/UserRiding.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainRiding from "./pages/CaptainRiding.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <UserLogin />,
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <UserSignup />
          </AuthLayout>
        ),
      },
      {
        path: "/home",
        element: (
          <UserProtectedWrapper>
            <UserHome />
          </UserProtectedWrapper>
        ),
      },
      {
        path: "/riding",
        element: (
          <UserProtectedWrapper>
            <UserRiding />
          </UserProtectedWrapper>
        ),
      },
      {
        path: "/captain-login",
        element: (
          <AuthLayout authentication={false}>
            <CaptainLogin />
          </AuthLayout>
        ),
      },
      {
        path: "/captain-signup",
        element: (
          <AuthLayout authentication={false}>
            <CaptainSignup />
          </AuthLayout>
        ),
      },
      {
        path: "/captain-home",
        element: (
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        ),
      },
      {
        path: "/captain-riding",
        element: (
          <CaptainProtectedWrapper>
            <CaptainRiding />
          </CaptainProtectedWrapper>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
