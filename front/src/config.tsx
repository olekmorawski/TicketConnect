import {
  zircuitTestnet,
  mantleTestnet,
  scrollSepolia,
  celoAlfajores,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { createClient } from "viem";

export const config = createConfig({
  chains: [
    zircuitTestnet,
    mantleTestnet,
    scrollSepolia,
    celoAlfajores,
    optimismSepolia,
    sepolia,
  ],
  connectors: [injected()],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
