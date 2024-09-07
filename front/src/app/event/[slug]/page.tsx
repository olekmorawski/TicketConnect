"use client";
import React from 'react';
import { notFound } from 'next/navigation';

interface EventDetails {
  title: string;
  imageUrl: string;
  description: string;
  location: string;
  time: string;
  price: number;
}

export const eventData: { [key: string]: EventDetails } = {
  'concert-ticket': {
    title: "Concert Ticket",
    imageUrl: "/api/placeholder/400/300",
    description: "An amazing concert experience featuring top artists and unforgettable performances.",
    location: "City Arena",
    time: "2024-09-15 20:00",
    price: 50
  },
  'movie-pass': {
    title: "Movie Pass",
    imageUrl: "/api/placeholder/400/300",
    description: "Enjoy the latest blockbuster in state-of-the-art cinema with immersive sound and picture quality.",
    location: "Cineplex",
    time: "2024-09-16 19:30",
    price: 15
  },
  'sports-event': {
    title: "Sports Event",
    imageUrl: "/api/placeholder/400/300",
    description: "Witness an exciting sports match with world-class athletes competing at the highest level.",
    location: "Sports Stadium",
    time: "2024-09-17 15:00",
    price: 80
  },
  'theater-show': {
    title: "Theater Show",
    imageUrl: "/api/placeholder/400/300",
    description: "A captivating theatrical performance that will transport you to another world.",
    location: "Grand Theater",
    time: "2024-09-18 19:00",
    price: 65
  }
};

export default function EventPage({ params }: { params: { slug: string } }) {
  const eventSlug = params.slug;
  const event = eventData[eventSlug];

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} className="w-full max-w-2xl mb-6 rounded-lg shadow-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{event.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Event Details</h2>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date and Time:</strong> {event.time}</p>
          <p><strong>Price:</strong> ${event.price}</p>
        </div>
      </div>
      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Buy Ticket
        </button>
      </div>
    </div>
  );
}