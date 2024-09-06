import { celo, optimism, scroll, mantle } from "viem/chains";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { createClient } from "viem";

export const config = createConfig({
  chains: [celo, optimism, scroll, mantle],
  connectors: [injected()],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
