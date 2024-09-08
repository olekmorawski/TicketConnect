// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ModNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {

    }

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds++;
        _safeMint(recipient, _tokenIds);
        return _tokenIds;
    }

}