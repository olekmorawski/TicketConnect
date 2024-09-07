// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

contract CoinOne is ERC20, MainDemoConsumerBase {
    uint256 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** DECIMALS;

    constructor() ERC20("CoinOne", "ONE") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function getBTCPrice() public view returns (uint256) {
        return getOracleNumericValueFromTxMsg(bytes32("BTC"));
    }

    function mint(address to, uint256 amount) public {
        uint256 btcPrice = getBTCPrice();
        uint256 adjustedAmount = (amount * btcPrice) / (10 ** DECIMALS);
        _mint(to, adjustedAmount);
    }

    function burn(uint256 amount) public {
        uint256 btcPrice = getBTCPrice();
        uint256 adjustedAmount = (amount * (10 ** DECIMALS)) / btcPrice;
        _burn(msg.sender, adjustedAmount);
    }
}
