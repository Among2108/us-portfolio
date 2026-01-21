import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
