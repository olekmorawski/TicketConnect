"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React, { createContext, useState, useContext } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config";

const queryClient = new QueryClient();

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

export function Providers({ children }: { children: React.ReactNode }) {
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <PasswordContext.Provider value={{ isPasswordConfirmed, setIsPasswordConfirmed }}>
            {children}
          </PasswordContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}