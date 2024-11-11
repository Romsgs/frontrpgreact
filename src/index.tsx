import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SessionProvider } from "./SessionContext";
import App from "./App";
import LoginSignup from "./Login_signup";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SessionProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  </SessionProvider>
);
