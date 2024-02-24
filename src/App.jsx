import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/home/index.jsx";
import React from "react";
import LoadingView from "./components/loading/index.jsx";

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
  return <RouterProvider router={router} />;
}

export default App;
