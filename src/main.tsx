import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./app";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
