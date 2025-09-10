import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/main.css";
import { RouterProvider } from "react-router";
import "../i18n/translate.ts";
import { AppProviders } from "../providers/AppProviders.tsx";
import { router } from "../routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);
