import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chainId your dApp will work on.
const desiredChainId =
  document.currentScript?.getAttribute('data-desired-chain-id') || ChainId.Mumbai;


const elementId = 'lazer-thirdwed-token-gating-app';
const container = document.createElement('div');
container.setAttribute('id', elementId);
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <ThirdwebProvider desiredChainId={desiredChainId}>
    <App />
  </ThirdwebProvider>
);

