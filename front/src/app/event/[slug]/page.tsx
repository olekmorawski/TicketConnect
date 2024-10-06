"use client";
import React from "react";
import { notFound } from "next/navigation";
import { formatEther } from "viem";

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

const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const getTickets = (): Ticket[] => {
  return [
    {
      ticketId: "CT001",
      vendorDomainName: "concertorganizer.com",
      eventName: "Concert Ticket",
      eventLocation: "City Arena",
      originalPrice: BigInt(50 * 1e18), // 50 ETH
      arrivedAt: BigInt(new Date("2024-09-15 20:00").getTime() / 1000),
      ecdhTicketSecretPart:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      isSold: false,
      isRedeemed: false,
      currentOwner: "0x0000000000000000000000000000000000000000",
    },
    // Add more tickets here...
  ];
};

export default function EventPage({ params }: { params: { slug: string } }) {
  const eventSlug = params.slug;

  const tickets = getTickets();

  console.log("Received slug:", eventSlug);
  console.log("Available tickets:", tickets);

  const event = tickets.find(
    (ticket) => generateSlug(ticket.eventName) === eventSlug
  );

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
      <img
        src={`/api/placeholder/400/300`}
        alt={event.eventName}
        className="w-full max-w-2xl mb-6 rounded-lg shadow-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Event Details</h2>
          <p>
            <strong>Location:</strong> {event.eventLocation}
          </p>
          <p>
            <strong>Date and Time:</strong>{" "}
            {new Date(Number(event.arrivedAt) * 1000).toLocaleString()}
          </p>
          <p>
            <strong>Price:</strong> {formatEther(event.originalPrice)} ETH
          </p>
          <p>
            <strong>Vendor:</strong> {event.vendorDomainName}
          </p>
          <p>
            <strong>Status:</strong> {event.isSold ? "Sold" : "Available"}
          </p>
          {event.isRedeemed && (
            <p>
              <strong>Redeemed:</strong> Yes
            </p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Ticket Information</h2>
          <p>
            <strong>Ticket ID:</strong> {event.ticketId}
          </p>
          <p>
            <strong>Current Owner:</strong> {event.currentOwner}
          </p>
        </div>
      </div>
      <div className="mt-6">
        {!event.isSold && (
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Buy Ticket
          </button>
        )}
        {event.isSold && !event.isRedeemed && (
          <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
            Redeem Ticket
          </button>
        )}
        {event.isRedeemed && (
          <p className="text-green-600 font-semibold">
            This ticket has been redeemed
          </p>
        )}
      </div>
    </div>
  );
}
