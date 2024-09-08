"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSwitchChain } from "wagmi";
import { zircuitTestnet, mantleTestnet, scrollSepolia, celoAlfajores, optimismSepolia, sepolia } from "viem/chains";
import { usePasswordConfirmation } from "@/components/Providers";

export function Header() {
  const { isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { isPasswordConfirmed } = usePasswordConfirmation();
  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (chain) {
      setSelectedChainId(chain.id);
    }
  }, [chain]);

  useEffect(() => {
    console.log("Header - isConnected:", isConnected);
    console.log("Header - isPasswordConfirmed:", isPasswordConfirmed);
    console.log("Header - chain:", chain);
  }, [isConnected, isPasswordConfirmed, chain]);

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
    switchChain?.({ chainId });
  };

  return (
    <header className="flex flex-col items-start p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">Ticket Swap</h1>
          <nav>
            {isConnected && isPasswordConfirmed && (
              <Link href="/swap" className="text-blue-600 hover:text-blue-800 font-semibold">
                Swap Tickets
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
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