import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages";
import EventsListIndexPage from "./pages/events";
import CreateEventIndexPage from "./pages/events/create";
import EventIndexPage from "./pages/events/[id]";

const queryClient = new QueryClient();

export default function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/events" element={<EventsListIndexPage />} />
            <Route path="/events/:id" element={<EventIndexPage />} />
            <Route path="/events/create" element={<CreateEventIndexPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
