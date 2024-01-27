import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import ChatContextProvider from "./context/ChatContext.tsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </AuthContextProvider>
);
