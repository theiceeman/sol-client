import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { clusterApiUrl } from "@solana/web3.js";
import WalletConnectorContext from "./WalletConnectorContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <WalletConnectorContext> */}
      <App />
    {/* </WalletConnectorContext> */}
  </React.StrictMode>
);
