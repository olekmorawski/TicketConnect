"use client";
import React from "react";
import { notFound } from "next/navigation";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { contractABI, contractAddress } from "../../../constants/abi";

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

export default function EventPage({ params }: { params: { slug: string } }) {
  const eventSlug = params.slug;

  const {
    data: tickets,
    isError,
    isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "listTickets",
  }) as { data: Ticket[]; isError: boolean; isLoading: boolean };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading ticket data</div>;
  }

  const event = tickets?.find(
    (ticket) => ticket.eventName.toLowerCase().replace(/ /g, "-") === eventSlug
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
