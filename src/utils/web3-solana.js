import { Connection, PublicKey, SystemProgram, Transaction, clusterApiUrl } from "@solana/web3.js";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const CLUSTER_URL = import.meta.env.RPC_URL ?? clusterApiUrl("devnet");
const connection = new Connection(CLUSTER_URL, { commitment: "finalized" });

export async function loadProvider() {
    const { solana } = window;
    console.log({ window })

    if (!solana) {
        console.log('Install Solana Phantom wallet.');
        return;
    }

    if ('phantom' in window) {
        const provider = window.phantom?.solana;

        if (provider?.isPhantom) {
            return provider;
        }
    }

    // window.open('https://phantom.app/', '_blank');
};


export async function connectToBrowserWallet() {
    try {
        const { solana } = window;
        if (!solana) throw new Error('Install Solana Phantom wallet.')

        const provider = window.phantom?.solana;

        // connect to wallet
        const wallet = await provider.request({ method: "connect", params: { onlyIfTrusted: true } });
        console.log({ wallet: wallet.publicKey.toString() })
        return wallet.publicKey.toString();

    } catch (err) {
        console.log({ err: err.message })
    }
}



export async function transferTransaction(provider, publicKey) {
    try {
        const transaction = await createTransferTransaction(publicKey);
        const signature = await provider.signAndSendTransaction(transaction);
        console.log({ signature })
    } catch (error) {
        console.log({ message: error });
    }
}

/**
 * Creates an arbitrary transfer transaction
 * @param   {PublicKey}      publicKey  a public key
 * @param   {Connection}  connection an RPC connection
 * @returns {Promise<Transaction>}            a transaction
 */
const createTransferTransaction = async (publicKey) => {
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(publicKey),
            toPubkey: new PublicKey(publicKey),
            lamports: 100,
        })
    );
    transaction.feePayer = new PublicKey(publicKey);

    const anyTransaction = transaction;
    anyTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    return anyTransaction;
};