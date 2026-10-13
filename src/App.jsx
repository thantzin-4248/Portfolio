
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage, {
  projectDetailsLoader,
  ProjectDetailsError,
} from "./pages/ProjectDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:projectId",
        loader: projectDetailsLoader,
        element: <ProjectDetailsPage />,
        errorElement: <ProjectDetailsError />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
