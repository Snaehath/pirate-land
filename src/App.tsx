/* eslint-disable unicorn/filename-case */

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// custom
import Header from "./components/header";
import Footer from "./components/footer";

// pages
const LoginPage = lazy(() => import("./pages/login"));
const HarborPage = lazy(() => import("./pages/harbor"));
const ErrorPage = lazy(() => import("./pages/error"));

const App: React.FC = () => (
  <div className="flex flex-col p-3 justify-between bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)] bg-no-repeat">
    <Header />
    <Suspense fallback={<h1>loading...</h1>}>
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
          path="/*"
          element={<ErrorPage />}
        />
      </Routes>
    </Suspense>
    <Footer />
  </div>
);

export default App;
