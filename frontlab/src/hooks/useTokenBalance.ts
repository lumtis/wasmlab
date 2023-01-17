import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

import { convertMicroDenomToDenom } from "../util/conversion";
import { CW20 } from "../services/cw20";
import { walletState, WalletStatusType } from "../state/atoms/walletAtoms";

async function fetchTokenBalance({
  client,
  token: { token_address, decimals },
  address,
}: {
  client: SigningCosmWasmClient;
  token: {
    token_address: string;
    decimals?: number;
  };
  address: string;
}) {
  /*
   * everything else
   *  */
  if (token_address) {
    const balance = await CW20(client).use(token_address).balance(address);
    return convertMicroDenomToDenom(Number(balance), decimals);
  }

  return 0;
}

export const useTokenBalance = (
  tokenSymbol: string,
  tokenAddress: string,
  decimal: number
) => {
  const { address, status, client } = useRecoilValue(walletState);

  const { data: balance = 0, isLoading } = useQuery(
    ["tokenBalance", tokenSymbol, address],
    async ({ queryKey: [, symbol] }) => {
      if (symbol && client) {
        return await fetchTokenBalance({
          client,
          address,
          token: {
            token_address: tokenAddress,
            decimals: decimal,
          },
        });
      }
    },
    {
      enabled: Boolean(tokenSymbol && status === WalletStatusType.connected),
      refetchOnMount: "always",
    }
  );

  return { balance, isLoading };
};
