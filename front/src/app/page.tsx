"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import * as secp256k1 from '@noble/secp256k1';

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
}

function TicketInterface() {
  const [keyPairs, setKeyPairs] = useState<KeyPair[]>([]);
  const { isConnected } = useAccount();

  // Sample items data
  const items: Item[] = [
    { id: 1, title: "Concert Ticket", price: 50, imageUrl: "/api/placeholder/200/200" },
    { id: 2, title: "Movie Pass", price: 15, imageUrl: "/api/placeholder/200/200" },
    { id: 3, title: "Sports Event", price: 80, imageUrl: "/api/placeholder/200/200" },
    { id: 4, title: "Theater Show", price: 65, imageUrl: "/api/placeholder/200/200" },
  ];

  // Add contract write hook here
  // const { write } = useContractWrite({...})

  const generateKeyPairs = () => {
    const generatePair = (): KeyPair => {
      const privateKey = generatePrivateKey();
      const account = privateKeyToAccount(privateKey);
      
      // Convert the private key to an ECDH key
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

  const handleSwap = () => {
    // Implement swap logic here
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Swap</h2>
      <div className="mb-4">
        {isConnected && (
          <button
            onClick={generateKeyPairs}
            className="bg-green-500 text-white px-4 py-2 rounded mr-4"
          >
            Generate Key Pairs
          </button>
        )}
        <button
          onClick={handleSwap}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Swap
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 flex flex-col items-center">
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