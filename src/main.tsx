import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsListIndexPage from "./pages/events";
import IndexPage from "./pages";
import "./index.css";
import CreateEventIndexPage from "./pages/events/create";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/events" element={<EventsListIndexPage />} />
        <Route path="/events/create" element={<CreateEventIndexPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
