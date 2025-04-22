import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { cartridgeProvider, StarknetConfig } from "@starknet-react/core";
import { mainnet } from "@starknet-react/chains";
import { shortString } from "starknet";
import SessionConnector from "@cartridge/connector/session";

const sessionOptions = {
  rpc: "https://api.cartridge.gg/x/starknet/mainnet",
  chainId: shortString.encodeShortString("SN_MAIN"),
  policies: {
    contracts: {
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7": {
        methods: [
          {
            name: "approve",
            entrypoint: "approve",
            description:
              "Allow the controller to call these methods on the contract",
          },
        ],
      },
    },
  },
  redirectUrl:
    new URLSearchParams(window.location.search).get("redirectUrl") ||
    "http://localhost:5173",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StarknetConfig
      chains={[mainnet]}
      provider={cartridgeProvider()}
      connectors={[new SessionConnector(sessionOptions)]}
      autoConnect
    >
      <App />
    </StarknetConfig>
  </StrictMode>
);
