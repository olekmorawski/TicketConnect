// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketMarketplace {
    address public constant ACCOUNT = 0xdeafbeef;

    struct Ticket {
        string ticketId;
        string vendorDomainName;
        string eventName;
        string eventLocation;
        uint256 originalPrice;
        uint256 arrivedAt;
        bytes32 ecdhTicketSecretPart;
    }

    struct Offer {
        uint256 offerId;
        Ticket ticket;
        uint256 price;
    }

    Ticket[] private tickets;
    mapping(uint256 => Offer) public offers;
    uint256 private offerCounter;
    mapping(address => uint256) public accountBalances;

    event TicketAdded(string ticketId);
    event OfferCreated(uint256 offerId, string ticketId, uint256 price);
    event TicketSold(uint256 offerId, address buyer);
    event TicketRedeemed(string ticketId);

    function listTickets() public view returns (Ticket[] memory) {
        return tickets;
    }

    function addTicket(Ticket memory ticket) private {
        tickets.push(ticket);
        emit TicketAdded(ticket.ticketId);
    }

    function marketSell(Ticket memory ticket, uint256 price) public returns (uint256) {
        offerCounter++;
        offers[offerCounter] = Offer(offerCounter, ticket, price);
        emit OfferCreated(offerCounter, ticket.ticketId, price);
        return offerCounter;
    }

    function buy(uint256 offerId) public returns (bool) {
        require(offers[offerId].offerId != 0, "Offer does not exist");
        require(accountBalances[msg.sender] >= offers[offerId].price, "Insufficient balance");

        accountBalances[msg.sender] -= offers[offerId].price;
        accountBalances[ACCOUNT] += offers[offerId].price;

        addTicket(offers[offerId].ticket);
        emit TicketSold(offerId, msg.sender);

        delete offers[offerId];
        return true;
    }

    function announceTicketRedeemed(Ticket memory ticket) public {
        emit TicketRedeemed(ticket.ticketId);
    }

}