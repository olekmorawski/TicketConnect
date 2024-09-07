"use client";
import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { zircuitTestnet, mantleTestnet, scrollSepolia, celoAlfajores, optimismSepolia } from "viem/chains";

export function Header() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const handleConnect = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      await connect({ connector: connectors[0] });
    }
  };

  const networks = [
    { name: "Zircuit Testnet", chain: zircuitTestnet },
    { name: "Mantle Testnet", chain: mantleTestnet },
    { name: "Scroll Sepolia", chain: scrollSepolia },
    { name: "Celo Alfajores", chain: celoAlfajores },
    { name: "Optimism Sepolia", chain: optimismSepolia },
  ];

  return (
    <header className="flex flex-col items-start p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">Ticket Swap</h1>
          <nav>
            <Link href="/swap" className="text-blue-600 hover:text-blue-800 font-semibold">
              Swap Tickets
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                onClick={() => {
                  handleConnect();
                  if (!isConnected) openConnectModal();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <div>
                  {isConnected ? 'Disconnect' : 'Connect Wallet'}
                </div>
              </button>
            )}
          </ConnectButton.Custom>
          {isConnected && (
            <select
              onChange={(e) => switchChain?.({ chainId: parseInt(e.target.value) })}
              value={chain?.id}
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