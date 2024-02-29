import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/home/index.jsx";
import React, { useEffect, useState } from "react";
import LoadingView from "./components/loading/index.jsx";
import { getServerUrl } from "./api/common.js";
import ErrorView from "./components/ErrorView/index.jsx";
import PageLoading from "./components/PageLoading/index.jsx";

const SubmitPage = React.lazy(() => import("./pages/SubmitGen/index.jsx"));
const TakePicturePage = React.lazy(() =>
  import("./pages/TakePicture/index.jsx"),
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/submit",
    element: (
      <React.Suspense fallback={<LoadingView />}>
        <SubmitPage />
      </React.Suspense>
    ),
  },
  {
    path: "/take-picture",
    element: (
      <React.Suspense fallback={<LoadingView />}>
        <TakePicturePage />
      </React.Suspense>
    ),
  },
]);
function App() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const init = () => {
    setLoading(true);
    getServerUrl().then((url) => {
      setLoading(false);
      setErr(!url);
    });
  };
  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : err ? (
    <ErrorView onRetry={init} />
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
