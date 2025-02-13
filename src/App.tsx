/* eslint-disable unicorn/filename-case */

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// pages
const LoginPage = lazy(() => import("./pages/login"));
const HomePage = lazy(() => import("./pages/home"));
const ErrorPage = lazy(() => import("./pages/error"));

const App: React.FC = () => (
  <Suspense fallback={<h1>loading...</h1>}>
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />
      <Route
        path="/home"
        element={<HomePage />}
      />
      <Route
        path="/*"
        element={<ErrorPage />}
      />
    </Routes>
  </Suspense>
);

export default App;
