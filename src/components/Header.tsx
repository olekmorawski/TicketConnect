"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Multi-Chain DEX</h1>
      <ConnectButton />
    </header>
  );
}
