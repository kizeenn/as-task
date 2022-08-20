import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./app";


const { worker } = await import("./mocks/browser");
worker.start({ onUnhandledRequest: "bypass" });


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
