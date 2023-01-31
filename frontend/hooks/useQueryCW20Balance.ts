import { useState, useEffect } from "react";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "../config";
import { Cw20baseQueryClient } from "../clients/cw20base/Cw20base.client";

const useQueryCW20Balance = (
  contractAddress: string,
  holderAddress: string
) => {
  const chain = useChain(chainName);
  const [balance, setBalance] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const client = await chain.getCosmWasmClient();
      const queryClient = new Cw20baseQueryClient(client, contractAddress);
      const balanceResponse = await queryClient.balance({
        address: holderAddress,
      });
      setBalance(balanceResponse.balance);
      setLoading(false);
    };
    fetchBalance();
  }, [contractAddress, holderAddress]);

  return { balance, loading };
};

export default useQueryCW20Balance;
