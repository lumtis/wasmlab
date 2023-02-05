import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { useState, useEffect } from "react";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "../config";
import { WalletStatus } from "@cosmos-kit/core";

const useTxWithMsg = (
  contractAddress: string,
  msg: any
): {
  send?: () => Promise<ExecuteResult>;
  loading: boolean;
} => {
  const chain = useChain(chainName);
  const [send, setSend] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contractAddress) {
      const execute = async () => {
        if (chain.status == WalletStatus.Connected) {
          const client = await chain.getSigningCosmWasmClient();

          // TODOHERE: gas price should be set from ChainProvider SignerOption
          // Fix setting SignerOption and remove this line
          client.gasPrice = GasPrice.fromString("0.025ujunox");

          if (chain.address) {
            const address = chain.address;

            const sendMint = async () => {
              return await client.execute(
                address,
                contractAddress,
                msg,
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
    }
  }, [contractAddress, chain.status, chain.address, msg]);

  return { send, loading };
};

export default useTxWithMsg;
