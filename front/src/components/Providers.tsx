"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React, { createContext, useState, useContext, useEffect } from "react";
import { WagmiProvider, useAccount } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config";

const queryClient = new QueryClient();

// Password Context
const PasswordContext = createContext<{
  isPasswordConfirmed: boolean;
  setIsPasswordConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

export function usePasswordConfirmation() {
  const context = useContext(PasswordContext);
  if (context === undefined) {
    throw new Error('usePasswordConfirmation must be used within a PasswordProvider');
  }
  return context;
}

// Wallet Context
const WalletContext = createContext<{
  isConnected: boolean;
  address: string | undefined;
  chain: { id: number; name: string } | undefined;
} | undefined>(undefined);

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

// Main Providers component
export function Providers({ children }: { children: React.ReactNode }) {
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [walletState, setWalletState] = useState({ 
    isConnected: false, 
    address: undefined as string | undefined,
    chain: undefined as { id: number; name: string } | undefined 
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletContext.Provider value={walletState}>
            <PasswordContext.Provider value={{ isPasswordConfirmed, setIsPasswordConfirmed }}>
              <WalletStateUpdater setWalletState={setWalletState}>
                {children}
              </WalletStateUpdater>
            </PasswordContext.Provider>
          </WalletContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// WalletStateUpdater component
function WalletStateUpdater({ 
  children, 
  setWalletState 
}: { 
  children: React.ReactNode, 
  setWalletState: React.Dispatch<React.SetStateAction<{
    isConnected: boolean;
    address: string | undefined;
    chain: { id: number; name: string } | undefined;
  }>>
}) {
  const { address, isConnected, chain } = useAccount();

  useEffect(() => {
    setWalletState({ 
      isConnected, 
      address,
      chain: chain ? { id: chain.id, name: chain.name } : undefined
    });
  }, [isConnected, address, chain, setWalletState]);

  return <>{children}</>;
}