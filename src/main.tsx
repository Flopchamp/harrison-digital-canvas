import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Self-hosted Inter variable font — eliminates the Google Fonts render-blocking
// cross-origin request. One WOFF2 variable font file covers all weights (100–900).
import "@fontsource-variable/inter";

createRoot(document.getElementById("root")!).render(<App />);
