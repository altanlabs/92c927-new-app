import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import RootBoundary from "./components/errors/RootBoundary";
import Layout from "./layout";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);