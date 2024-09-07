// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/CoinOne.sol";
import "../src/CoinTwo.sol";
import "../src/SimpleDEX.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        CoinOne coinOne = new CoinOne();
        CoinTwo coinTwo = new CoinTwo(1_000_000 * 10 ** 18);
        SimpleDEX simpleDEX = new SimpleDEX();

        console.log("CoinOne deployed to:", address(coinOne));
        console.log("CoinTwo deployed to:", address(coinTwo));
        console.log("SimpleDEX deployed to:", address(simpleDEX));

        vm.stopBroadcast();
    }
}
