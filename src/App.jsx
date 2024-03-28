import "./App.css";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useEffect, useState } from "react";
import {
  connectToBrowserWallet,
  loadProvider,
  transferTransaction,
} from "./utils/web3-solana";

function App() {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState("");

  useEffect(() => {
    async function fetch() {
      setProvider(await loadProvider());

      let result = await connectToBrowserWallet();
      if (result) setAddress(result);
    }
    fetch();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <button
          onClick={async () => setAddress(await connectToBrowserWallet())}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span> {address !== "" ? address : "Connect Wallet"} </span>
        </button>

        <button
          onClick={async () => await transferTransaction(provider, address)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Send Transaction</span>
        </button>
      </div>
    </>
  );
}

export default App;
