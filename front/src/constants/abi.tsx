export const contractAddress = "0x71Cdb60E9643443bD3F75043533F7fBD6bd0ADD0"  as `0x${string}`;

export const contractABI = [
	
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "initialAccountAddress",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "newAddress",
					"type": "address"
				}
			],
			"name": "AccountAddressChanged",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "ticketId",
					"type": "string"
				}
			],
			"name": "announceTicketRedeemed",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "offerId",
					"type": "uint256"
				}
			],
			"name": "buy",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "ticketId",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "vendorDomainName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "eventName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "eventLocation",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "originalPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "arrivedAt",
					"type": "uint256"
				},
				{
					"internalType": "bytes32",
					"name": "ecdhTicketSecretPart",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				}
			],
			"name": "marketSell",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newAccountAddress",
					"type": "address"
				}
			],
			"name": "setAccountAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "ticketId",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				}
			],
			"name": "TicketListed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "ticketId",
					"type": "string"
				}
			],
			"name": "TicketRedeemed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "ticketId",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "buyer",
					"type": "address"
				}
			],
			"name": "TicketSold",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "accountAddress",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "accountBalances",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "listTickets",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "ticketId",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "vendorDomainName",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "eventName",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "eventLocation",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "originalPrice",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "arrivedAt",
							"type": "uint256"
						},
						{
							"internalType": "bytes32",
							"name": "ecdhTicketSecretPart",
							"type": "bytes32"
						},
						{
							"internalType": "bool",
							"name": "isSold",
							"type": "bool"
						},
						{
							"internalType": "bool",
							"name": "isRedeemed",
							"type": "bool"
						},
						{
							"internalType": "address",
							"name": "currentOwner",
							"type": "address"
						}
					],
					"internalType": "struct TicketMarketplace.Ticket[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "offers",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "offerId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "ticketIndex",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "tickets",
			"outputs": [
				{
					"internalType": "string",
					"name": "ticketId",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "vendorDomainName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "eventName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "eventLocation",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "originalPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "arrivedAt",
					"type": "uint256"
				},
				{
					"internalType": "bytes32",
					"name": "ecdhTicketSecretPart",
					"type": "bytes32"
				},
				{
					"internalType": "bool",
					"name": "isSold",
					"type": "bool"
				},
				{
					"internalType": "bool",
					"name": "isRedeemed",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "currentOwner",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	
  ] as const;
  