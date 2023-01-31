import { useState, useEffect } from "react";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "../config";
import { Cw20baseQueryClient } from "../clients/cw20base/Cw20base.client";

export type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
};

const useQueryCW20Info = (contractAddress: string) => {
  const chain = useChain(chainName);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const client = await chain.getCosmWasmClient();
      const queryClient = new Cw20baseQueryClient(client, contractAddress);
      const res = await queryClient.tokenInfo();
      const info: TokenInfo = {
        name: res.name,
        symbol: res.symbol,
        decimals: res.decimals,
      };
      setTokenInfo(info);
      setLoading(false);
    };
    fetchInfo();
  }, [contractAddress]);

  return { tokenInfo, loading };
};

export default useQueryCW20Info;
