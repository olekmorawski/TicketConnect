"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSwitchChain, useEnsName, useEnsAvatar } from "wagmi";
import {
  zircuitTestnet,
  mantleTestnet,
  scrollSepolia,
  celoAlfajores,
  optimismSepolia,
  sepolia,
  mainnet,
} from "viem/chains";
import { usePasswordConfirmation } from "@/components/Providers";
import * as secp256k1 from "@noble/secp256k1";
import { formatAddress } from "@ens-tools/format";

export function Header() {
  const { isConnected, chain, address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id, // ENS is on Ethereum mainnet
  });
  const { switchChain } = useSwitchChain();
  const { isPasswordConfirmed } = usePasswordConfirmation();
  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(
    undefined
  );
  const [ecdhPublicKey, setEcdhPublicKey] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address && chain && !ecdhPublicKey) {
      // Generate ECDH key pair
      const privateKey = secp256k1.utils.randomPrivateKey();
      const publicKey = secp256k1.getPublicKey(privateKey);
      const ecdhPublicKeyHex = Buffer.from(publicKey).toString("hex");
      setEcdhPublicKey(ecdhPublicKeyHex);

      const notifyNewUser = async () => {
        try {
          const response = await fetch(
            `https://ticketconnect.xyz/notify_new_user?chain=${chain.name.toLowerCase()}&address=${address}&ecdh_publickey=${ecdhPublicKeyHex}`,
            {
              method: "POST",
              mode: "cors",
            }
          );
          if (response.ok) {
            console.log("Successfully notified of user connection");
          } else {
            console.error(
              "Failed to notify of user connection. Status:",
              response.status
            );
            const text = await response.text();
            console.error("Response text:", text);
          }
        } catch (error) {
          console.error("Error notifying of user connection:", error);
          if (
            error instanceof TypeError &&
            error.message.includes("SSL certificate")
          ) {
            console.error(
              "SSL Certificate Error. Please check the server's SSL configuration."
            );
          }
        }
      };

      notifyNewUser();
    }
  }, [isConnected, address, chain, ecdhPublicKey]);

  const networks = [
    { name: "Zircuit Testnet", chain: zircuitTestnet },
    { name: "Mantle Testnet", chain: mantleTestnet },
    { name: "Scroll Sepolia", chain: scrollSepolia },
    { name: "Celo Alfajores", chain: celoAlfajores },
    { name: "Optimism Sepolia", chain: optimismSepolia },
    { name: "Ethereum Sepolia", chain: sepolia },
  ];

  const handleNetworkChange = (chainId: number) => {
    setSelectedChainId(chainId);
    switchChain({ chainId });
  };

  return (
    <header className="flex flex-col items-start p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">Ticket Swap</h1>
          <nav className="space-x-4">
            {isConnected && isPasswordConfirmed && (
              <>
                <Link
                  href="/mytickets"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  My Tickets
                </Link>
                <Link
                  href="/swap"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Swap Tickets
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isConnected && address && (
            <div className="flex items-center space-x-2">
              {ensAvatar && (
                <img
                  src={ensAvatar}
                  alt="ENS Avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="font-semibold">
                {ensName || formatAddress(address)}
              </span>
            </div>
          )}
          <ConnectButton />
          {isConnected && (
            <select
              onChange={(e) => handleNetworkChange(parseInt(e.target.value))}
              value={selectedChainId}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              {networks.map((network) => (
                <option key={network.chain.id} value={network.chain.id}>
                  {network.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </header>
  );
}
