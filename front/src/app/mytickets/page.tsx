"use client";
import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function MyTickets() {
  // Mock ticket data
  const mockTicket = {
    eventName: "Summer Music Festival",
    originalPrice: "0.5",
    eventLocation: "Central Park, New York",
    date: "2024-07-15",
    status: "Valid"
  };

  const handleRedeem = () => {
    // Add redeem logic here
    console.log("Redeem ticket");
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh My Tickets
        </button>
        <ConnectButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-4 flex flex-col items-center">
          <img src="/api/placeholder/200/200" alt={mockTicket.eventName} className="w-full h-40 object-cover mb-2 rounded" />
          <h3 className="text-lg font-semibold">{mockTicket.eventName}</h3>
          <p className="text-gray-600">{mockTicket.originalPrice} ETH</p>
          <p className="text-sm">{mockTicket.eventLocation}</p>
          <p className="text-sm">{new Date(mockTicket.date).toLocaleDateString()}</p>
          <p className="text-sm font-semibold text-green-500">{mockTicket.status}</p>
          <div className="flex space-x-2 mt-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              View Details
            </button>
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              onClick={() => {}}
            >
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}