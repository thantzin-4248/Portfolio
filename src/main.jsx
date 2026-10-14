import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ProjectsProvider } from "./context/ProjectsContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </StrictMode>,
);
