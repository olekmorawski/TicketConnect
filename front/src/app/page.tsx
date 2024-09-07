"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import * as secp256k1 from '@noble/secp256k1';
import { useRouter } from 'next/navigation';

interface KeyPair {
  publicKey: `0x${string}`;
  privateKey: `0x${string}`;
  ecdhPublicKey: string;
}

interface Item {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  location: string;
  time: string;
}

function TicketInterface() {
  const [keyPairs, setKeyPairs] = useState<KeyPair[]>([]);
  const { isConnected } = useAccount();
  const router = useRouter();

  const items: Item[] = [
    { id: 1, title: "Concert Ticket", price: 50, imageUrl: "/api/placeholder/200/200", description: "An amazing concert experience", location: "City Arena", time: "2024-09-15 20:00" },
    { id: 2, title: "Movie Pass", price: 15, imageUrl: "/api/placeholder/200/200", description: "Enjoy the latest blockbuster", location: "Cineplex", time: "2024-09-16 19:30" },
    { id: 3, title: "Sports Event", price: 80, imageUrl: "/api/placeholder/200/200", description: "Exciting sports match", location: "Sports Stadium", time: "2024-09-17 15:00" },
    { id: 4, title: "Theater Show", price: 65, imageUrl: "/api/placeholder/200/200", description: "A captivating theatrical performance", location: "Grand Theater", time: "2024-09-18 19:00" },
  ];

  const generateKeyPairs = () => {
    const generatePair = (): KeyPair => {
      const privateKey = generatePrivateKey();
      const account = privateKeyToAccount(privateKey);
      
      const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex');
      const ecdhPublicKey = Buffer.from(secp256k1.getPublicKey(privateKeyBytes)).toString('hex');

      return {
        publicKey: account.address,
        privateKey: privateKey,
        ecdhPublicKey: ecdhPublicKey,
      };
    };

    const pair1 = generatePair();
    const pair2 = generatePair();

    setKeyPairs([pair1, pair2]);
  };

  const handleTicketClick = (item: Item) => {
    const slug = item.title.toLowerCase().replace(/ /g, '-');
    router.push(`/event/${slug}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Swap</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={generateKeyPairs}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate Key Pairs
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {items.map((item) => (
          <div 
            key={item.id}
            className="border rounded-lg p-4 flex flex-col items-center cursor-pointer"
            onClick={() => handleTicketClick(item)}
          >
            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">${item.price}</p>
          </div>
        ))}
      </div>

      {keyPairs.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Generated Key Pairs:</h3>
          {keyPairs.map((pair, index) => (
            <div key={index} className="mt-2">
              <p>Pair {index + 1}:</p>
              <p>Public Key: {pair.publicKey}</p>
              <p>Private Key: {pair.privateKey}</p>
              <p>ECDH Public Key: {pair.ecdhPublicKey}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TicketInterface;