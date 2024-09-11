"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";

interface Ticket {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

function Swap() {
  const { isConnected } = useAccount();
  const [selectedUserTicket, setSelectedUserTicket] = useState<Ticket | null>(
    null
  );
  const [selectedAvailableTicket, setSelectedAvailableTicket] =
    useState<Ticket | null>(null);

  const userTickets: Ticket[] = [
    {
      id: 1,
      title: "Concert A Ticket",
      price: 50,
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 2,
      title: "Movie Pass",
      price: 15,
      imageUrl: "/api/placeholder/200/200",
    },
  ];

  const availableTickets: Ticket[] = [
    {
      id: 3,
      title: "Sports Event",
      price: 80,
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 4,
      title: "Theater Show",
      price: 65,
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 5,
      title: "Concert B Ticket",
      price: 55,
      imageUrl: "/api/placeholder/200/200",
    },
  ];

  const handleUserTicketSelect = (ticket: Ticket) => {
    setSelectedUserTicket(ticket);
  };

  const handleAvailableTicketSelect = (ticket: Ticket) => {
    setSelectedAvailableTicket(ticket);
  };

  const handleSwap = () => {
    if (!selectedUserTicket || !selectedAvailableTicket) {
      alert("Please select both tickets to swap.");
      return;
    }

    console.log(
      `Swapping ${selectedUserTicket.title} for ${selectedAvailableTicket.title}`
    );

    setSelectedUserTicket(null);
    setSelectedAvailableTicket(null);

    alert("Swap completed successfully!");
  };

  const TicketCard = ({
    ticket,
    isSelected,
    onSelect,
  }: {
    ticket: Ticket;
    isSelected: boolean;
    onSelect: (ticket: Ticket) => void;
  }) => (
    <div
      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-100" : ""
      }`}
      onClick={() => onSelect(ticket)}
    >
      <img
        src={ticket.imageUrl}
        alt={ticket.title}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{ticket.title}</h3>
      <p className="text-gray-600">${ticket.price}</p>
    </div>
  );

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Ticket Swap</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Tickets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isSelected={selectedUserTicket?.id === ticket.id}
                onSelect={handleUserTicketSelect}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Available for Swap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isSelected={selectedAvailableTicket?.id === ticket.id}
                onSelect={handleAvailableTicketSelect}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSwap}
          disabled={
            !isConnected || !selectedUserTicket || !selectedAvailableTicket
          }
          className="bg-blue-500 text-white px-6 py-2 rounded font-semibold disabled:bg-gray-400"
        >
          Swap Tickets
        </button>
      </div>
    </div>
  );
}

export default Swap;
