/* eslint-disable unicorn/filename-case */

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// custom
import Header from "./components/header";
import Footer from "./components/footer";
import SuspenseLoader from "./components/suspense-loader";
import Loader from "./components/loader";

// pages
const LoginPage = lazy(() => import("./pages/login"));
const HarborPage = lazy(() => import("./pages/harbor"));
const ErrorPage = lazy(() => import("./pages/error"));
const CaptainPage = lazy(() => import("./pages/captain"));

const App: React.FC = () => (
  <div className="flex flex-col p-3 justify-between bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)] bg-no-repeat">
    <Header />
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
          path="/harbor"
          element={<HarborPage />}
        />
        <Route
          path="/captain/:id"
          element={<CaptainPage />}
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
)
;

export default App;
