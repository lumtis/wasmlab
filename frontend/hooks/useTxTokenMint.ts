import { GasPrice } from "@cosmjs/stargate";
import { useState, useEffect } from "react";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "../config";
import { WalletStatus } from "@cosmos-kit/core";

const useTxTokenMint = (contractAddress: string) => {
  const chain = useChain(chainName);
  const [send, setSend] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const execute = async () => {
      if (chain.status == WalletStatus.Connected) {
        const client = await chain.getSigningCosmWasmClient();

        // TODO: gas price should be set from ChainProvider SignerOption
        // Fix setting SignerOption and remove this line
        client.gasPrice = GasPrice.fromString("0.025ujunox");

        if (chain.address) {
          const address = chain.address;

          const sendMint = async (amount: string) => {
            return await client.execute(
              address,
              contractAddress,
              {
                mint: { recipient: address, amount },
              },
              "auto",
              "",
              []
            );
          };

          setLoading(false);
          setSend(() => sendMint);
        }
      }
    };
    execute();
  }, [contractAddress, chain.status, chain.address]);

  return { send: send, loading: loading };
};

export default useTxTokenMint;

// TODO:
// Find how to correctly implement a hook that returns a promise
// Remove clients
// Create general hooks for tx and query
