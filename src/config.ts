import { mainnet } from "viem/chains";
import { createConfig, http, injected } from "wagmi";

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/6R_eqxrBs9UtusSEP7YEm0dOhUHbLfZA"
    ),
  },
});
