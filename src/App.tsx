/* eslint-disable unicorn/filename-case */

import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";

// custom
import Header from "./components/header";
import Footer from "./components/footer";
import SuspenseLoader from "./components/suspense-loader";
import Loader from "./components/loader";
import { useAppContext } from "./contexts/app";

// pages
const LoginPage = lazy(() => import("./pages/login"));
const HarborPage = lazy(() => import("./pages/harbor"));
const ErrorPage = lazy(() => import("./pages/error"));
const CaptainPage = lazy(() => import("./pages/captain"));

const App: React.FC = () => {
  // hooks
  const { token } = useAppContext();

  return (
    <div className="flex flex-col p-3 justify-between bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)] bg-no-repeat">
      <Header />
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route
            path="/"
            element={token.length > 0 ? <Navigate to="/harbor" /> : <LoginPage />}
          />
          <Route
            path="/harbor"
            element={token.length > 0 ? <HarborPage /> : <Navigate to="/" />}
          />
          <Route
            path="/captain/:id"
            element={token.length > 0 ? <CaptainPage /> : <Navigate to="/" />}
          />
          <Route
            path="/*"
            element={<ErrorPage />}
          />
        </Routes>
      </Suspense>
      <Footer />
      <Loader />
    </div>
  );
};

export default App;
