import "../styles/globals.css";
import type { AppProps } from "next/app";
import { defaultTheme, ChainProvider } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { GasPrice } from "@cosmjs/stargate";

import { TailwindModal } from "../components";
import { ThemeProvider } from "../contexts/theme";

import { SignerOptions } from "@cosmos-kit/core";
import { chains, assets } from "chain-registry";
import { Chain } from "@chain-registry/types";

import { localnet } from "../config/localnet";

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case "localnet":
          return {
            gasPrice: GasPrice.fromString("0.025ujunox"),
          };
      }
    },
  };

  return (
    <ChainProvider
      chains={[...chains, localnet]}
      assetLists={assets}
      wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
      signerOptions={signerOptions}
      walletModal={TailwindModal}
      endpointOptions={{
        localnet: {
          rpc: ["http://localhost:26657"],
        },
      }}
    >
      <ThemeProvider>
        <div className="min-h-screen text-black bg-white dark:bg-gray-bg dark:text-white">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ChainProvider>
  );
}

export default CreateCosmosApp;
