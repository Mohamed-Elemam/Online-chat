import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { Register } from "./Register";
import Login from "./Login";
import { Chat } from "./Chat";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/chat", element: <Chat /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
