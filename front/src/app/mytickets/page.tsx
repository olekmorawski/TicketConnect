"use client";
import React, { useState } from "react";

export default function MyTickets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listingPrice, setListingPrice] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<{
    id: number;
    eventName: string;
    originalPrice: string;
    eventLocation: string;
    date: string;
    status: string;
  } | null>(null);

  // Mock ticket data
  const mockTicket = {
    id: 1,
    eventName: "Summer Music Festival",
    originalPrice: "0.5",
    eventLocation: "Central Park, New York",
    date: "2024-07-15",
    status: "Valid",
  };

  const handleRedeem = () => {
    console.log("Redeem ticket");
  };

  const handleSell = (ticket: typeof mockTicket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleListingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    console.error("DUPA KURWA CHUJ");
  };

  const handleListTicket = () => {
    if (selectedTicket) {
      // Add logic to list the ticket for sale
      console.log(
        `Listing ticket ${selectedTicket.id} for ${listingPrice} ETH`
      );
      setIsModalOpen(false);
      setListingPrice("");
      setSelectedTicket(null);
    } else {
      console.error("No ticket selected for listing");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-4 flex flex-col items-center">
          <img
            src="/api/placeholder/200/200"
            alt={mockTicket.eventName}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h3 className="text-lg font-semibold">{mockTicket.eventName}</h3>
          <p className="text-gray-600">{mockTicket.originalPrice} ETH</p>
          <p className="text-sm">{mockTicket.eventLocation}</p>
          <p className="text-sm">
            {new Date(mockTicket.date).toLocaleDateString()}
          </p>
          <p className="text-sm font-semibold text-green-500">
            {mockTicket.status}
          </p>
          <div className="flex space-x-2 mt-2">
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              onClick={handleRedeem}
            >
              Redeem
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              onClick={() => handleSell(mockTicket)}
            >
              Sell
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Set Listing Price for {selectedTicket.eventName}
            </h3>
            <input
              type="number"
              value={listingPrice}
              onChange={handleListingPriceChange}
              placeholder="Price in ETH"
              className="border rounded px-2 py-1 mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleListTicket}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                List Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
