import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import ReciepPage from "./pages/ReciepPage.tsx";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/reciep/:reciepId" element={<ReciepPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
	</StrictMode>
);
