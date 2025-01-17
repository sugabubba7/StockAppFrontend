import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import Header from "./components/Header";
import ChatBot from "./pages/ChatBot/ChatBot";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div>
      {/* <Header /> */}
      <App />
    </div>
  </StrictMode>
);
