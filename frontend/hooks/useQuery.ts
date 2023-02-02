import { useState, useEffect } from "react";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "../config";

const useQuery = (
  contractAddress: string,
  msg: any
): {
  res: any;
  loading: boolean;
} => {
  const chain = useChain(chainName);
  const [res, setRes] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const client = await chain.getCosmWasmClient();

      const queryRes = await client.queryContractSmart(contractAddress, msg);

      setRes(queryRes);
      setLoading(false);
    };
    fetchBalance();
  }, []);

  return { res, loading };
};

export default useQuery;
