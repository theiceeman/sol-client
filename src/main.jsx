import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { clusterApiUrl } from "@solana/web3.js";
import WalletConnector from "./WalletConnector.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletConnector>
      <App />
    </WalletConnector>
  </React.StrictMode>
);
