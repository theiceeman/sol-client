import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { Wallet } from '@solana/wallet-adapter-wallets';
import { WalletModal, WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

function WalletConnector({ children }) {
  // Define network configuration
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);

  // Define wallets
  const wallets = [];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}
        <WalletModal />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
export default WalletConnector;
