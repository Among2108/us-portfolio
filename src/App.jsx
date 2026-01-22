import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";
import { useEffect } from "react";

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
  
  useEffect(() => {
      if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // สำคัญ: ไม่ใช้ smooth ตอน reload
      });
    }, []);
  return <RouterProvider router={router} />;
}

export default App;
