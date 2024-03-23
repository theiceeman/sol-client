import { useState } from "react";
import "./App.css";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

function App() {
  let [lamports, setLamports] = useState(0.1);
  let [wallet, setWallet] = useState(
    "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9"
  );

  const connection = new Connection(clusterApiUrl("devnet"));
  const { signIn, connect, publicKey, sendTransaction } = useWallet();

  function walletConnect() {
    console.log("xxx");

    const input = {
      domain: window.location.host,
      address: publicKey ? publicKey.toBase58() : undefined,
      statement: "Please sign in to proceed.",
    };

    connect();
    signIn(input)
  }

  useEffect(() => {
    console.log({ WalletModalButton });

    // connection.getBalance(publicKey).then((bal) => {
    //   console.log(bal / LAMPORTS_PER_SOL);
    // });
  }, []);

  return (
    <>
      <div className="text-purple-600">hello world</div>
      <button
        onClick={() => {
          walletConnect();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Button
      </button>

        <button
          onClick={() => {
            walletConnect();
          }}
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button
        </button>
    </>
  );
}

export default App;
