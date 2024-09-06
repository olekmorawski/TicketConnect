"use client";
import React, { useState } from "react";

function SwapInterface() {
  const [amount, setAmount] = useState("");
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");

  // Add contract write hook here
  // const { write } = useContractWrite({...})

  const handleSwap = () => {
    // Implement swap logic here
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Swap</h2>
      <div className="mb-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="mr-2"
        />
        <select
          value={tokenIn}
          onChange={(e) => setTokenIn(e.target.value)}
          className="mr-2"
        >
          {/* Add token options here */}
        </select>
        <select value={tokenOut} onChange={(e) => setTokenOut(e.target.value)}>
          {/* Add token options here */}
        </select>
      </div>
      <button
        onClick={handleSwap}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Swap
      </button>
    </div>
  );
}

export default SwapInterface;
