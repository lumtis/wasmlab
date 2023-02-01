import "../styles/globals.css";
import "@fontsource/vt323/400.css";
import type { AppProps } from "next/app";
import { ChainProvider } from "@cosmos-kit/react";
import { ChakraProvider } from "@chakra-ui/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { GasPrice } from "@cosmjs/stargate";

import { SignerOptions } from "@cosmos-kit/core";
import { chains, assets } from "chain-registry";
import { Chain } from "@chain-registry/types";

import { localnet } from "../config/localnet";
import { defaultTheme } from "../config/theme";

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    signingCosmwasm: (_: Chain) => {
      return {
        gasPrice: GasPrice.fromString("0.025ujunox"),
      };
    },
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <ChainProvider
        chains={[...chains, localnet]}
        assetLists={assets}
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
        signerOptions={signerOptions}
      >
        <Component {...pageProps} />
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
