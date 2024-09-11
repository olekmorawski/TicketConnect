// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTTicketMarketplace is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Ticket {
        uint256 tokenId;
        string vendorDomainName;
        string eventName;
        string eventLocation;
        uint256 originalPrice;
        uint256 eventDate;
        bytes32 ecdhTicketSecretPart;
        bool isRedeemed;
    }

    struct Offer {
        uint256 tokenId;
        uint256 price;
    }

    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => Offer) public offers;

    event TicketMinted(uint256 tokenId, address owner);
    event TicketListed(uint256 tokenId, uint256 price);
    event TicketSold(uint256 tokenId, address buyer, uint256 price);
    event TicketRedeemed(uint256 tokenId);
    event ListingCancelled(uint256 tokenId);

    constructor(
        address initialOwner
    ) ERC721("NFT Ticket", "NFTTICKET") Ownable(initialOwner) {}

    function mintTicket(
        address to,
        uint256 tokenId,
        string memory vendorDomainName,
        string memory eventName,
        string memory eventLocation,
        uint256 originalPrice,
        uint256 eventDate,
        bytes32 ecdhTicketSecretPart,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        tickets[newTokenId] = Ticket(
            tokenId,
            vendorDomainName,
            eventName,
            eventLocation,
            originalPrice,
            eventDate,
            ecdhTicketSecretPart,
            false
        );

        emit TicketMinted(newTokenId, to);
        return newTokenId;
    }

    function isTicketValid(uint256 tokenId) public view returns (bool) {
        Ticket memory ticket = tickets[tokenId];
        return (!ticket.isRedeemed && block.timestamp < ticket.eventDate);
    }

    function listTicketForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "You don't own this ticket");
        require(isTicketValid(tokenId), "Ticket is not valid for sale");

        offers[tokenId] = Offer(tokenId, price);
        emit TicketListed(tokenId, price);
    }

    function buyTicket(uint256 tokenId) public payable nonReentrant {
        Offer memory offer = offers[tokenId];
        require(offer.tokenId != 0, "Ticket is not for sale");
        require(msg.value >= offer.price, "Insufficient payment");
        require(isTicketValid(tokenId), "Ticket is not valid for purchase");

        address payable seller = payable(ownerOf(tokenId));
        _transfer(seller, msg.sender, tokenId);

        // Transfer the payment directly to the seller
        seller.transfer(msg.value);

        delete offers[tokenId];
        emit TicketSold(tokenId, msg.sender, msg.value);
    }

    function redeemTicket(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You don't own this ticket");
        require(
            !tickets[tokenId].isRedeemed,
            "Ticket has already been redeemed"
        );
        require(
            block.timestamp < tickets[tokenId].eventDate,
            "Event has already passed"
        );

        tickets[tokenId].isRedeemed = true;
        emit TicketRedeemed(tokenId);
    }

    function cancelListing(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You don't own this ticket");
        require(offers[tokenId].tokenId != 0, "Ticket is not listed for sale");

        delete offers[tokenId];
        emit ListingCancelled(tokenId);
    }
}
