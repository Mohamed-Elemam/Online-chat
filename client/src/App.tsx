import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Chat } from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { token } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/register", element: token ? <Chat /> : <Register /> },
        { path: "/login", element: token ? <Chat /> : <Login /> },
        {
          path: "/chat",
          element: token ? <Chat /> : <Login />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
