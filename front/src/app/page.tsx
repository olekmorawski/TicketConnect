"use client";
import React, { useState, useEffect } from "react";
import { formatEther } from 'viem';
import { useRouter } from 'next/navigation';
import { useReadContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePasswordConfirmation, useWallet } from "@/components/Providers";
import { contractABI, contractAddress } from '../constants/abi';

interface Ticket {
  ticketId: string;
  vendorDomainName: string;
  eventName: string;
  eventLocation: string;
  originalPrice: bigint;
  arrivedAt: bigint;
  ecdhTicketSecretPart: `0x${string}`;
  isSold: boolean;
  isRedeemed: boolean;
  currentOwner: `0x${string}`;
}

function TicketInterface() {
  const router = useRouter();
  const { isConnected, address } = useWallet();
  const { isPasswordConfirmed, setIsPasswordConfirmed } = usePasswordConfirmation();

  const [hasSetPassword, setHasSetPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: tickets, isError, isLoading, refetch } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'listTickets',
  }) as { data: Ticket[], isError: boolean, isLoading: boolean, refetch: () => void };

  useEffect(() => {
    if (isConnected && address) {
      const storedPassword = localStorage.getItem(`password_${address}`);
      setHasSetPassword(!!storedPassword);
      setIsPasswordConfirmed(false);
    } else {
      setHasSetPassword(false);
      setIsPasswordConfirmed(false);
    }
  }, [isConnected, address, setIsPasswordConfirmed]);

  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      localStorage.setItem(`password_${address}`, password);
      setHasSetPassword(true);
      setIsPasswordConfirmed(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Passwords do not match!");
    }
  };

  const handleEnterPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(`password_${address}`);
    if (enteredPassword === storedPassword) {
      setErrorMessage("");
      setIsPasswordConfirmed(true);
    } else {
      setErrorMessage("Incorrect password!");
    }
  };

  const handleTicketClick = (ticket: Ticket) => {
    const slug = ticket.eventName.toLowerCase().replace(/ /g, '-');
    router.push(`/event/${slug}`);
  };

  if (!isConnected) {
    return (
      <div className="mt-8 text-center">
        <p>Please connect your wallet to continue.</p>
      </div>
    );
  }

  if (!hasSetPassword) {
    return (
      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Set Password</h2>
        <form onSubmit={handleSetPassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Set Password
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    );
  }

  if (!isPasswordConfirmed) {
    return (
      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
        <form onSubmit={handleEnterPassword} className="space-y-4">
          <div>
            <label htmlFor="enteredPassword" className="block mb-1">Password:</label>
            <input
              type="password"
              id="enteredPassword"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Enter
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Available Tickets</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => refetch()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh Tickets
        </button>
      </div>
      
      {isLoading && <p>Loading tickets...</p>}
      {isError && <p>Error loading tickets. Please try again.</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tickets && tickets.map((ticket, index) => (
          <div 
            key={index}
            className="border rounded-lg p-4 flex flex-col items-center cursor-pointer"
            onClick={() => handleTicketClick(ticket)}
          >
            <img src={`/api/placeholder/200/200`} alt={ticket.eventName} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
            <p className="text-gray-600">{formatEther(ticket.originalPrice)} ETH</p>
            <p className="text-sm">{ticket.eventLocation}</p>
            <p className="text-sm">{new Date(Number(ticket.arrivedAt) * 1000).toLocaleString()}</p>
            <p className="text-sm">{ticket.isSold ? "Sold" : "Available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketInterface;