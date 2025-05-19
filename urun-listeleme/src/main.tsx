import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { CustomThemeProvider } from "./context/ThemeContext";
import "./assets/styles/_global.scss";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CustomThemeProvider>
            <App />
        </CustomThemeProvider>
    </React.StrictMode>
);
