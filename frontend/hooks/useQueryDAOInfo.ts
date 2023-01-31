import { useState, useEffect } from "react";
import { useChain } from "@cosmos-kit/react";
import { DaoCoreQueryClient } from "../clients/daocore/DaoCore.client";
import { chainName } from "../config";

// DAOInfo is a type that represents DAO information
export type DAOInfo = {
  name: string;
  description: string;
  address: string;
};

const useQueryDAOInfo = (address: string) => {
  const chain = useChain(chainName);
  const [daoInfo, setDAO] = useState<DAOInfo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDAO = async () => {
      const client = await chain.getCosmWasmClient();
      const queryClient = new DaoCoreQueryClient(client, address);
      const config = await queryClient.config();
      const info: DAOInfo = {
        name: config.name,
        description: config.description,
        address: address,
      };
      setDAO(info);
      setLoading(false);
    };
    fetchDAO();
  }, [address]);

  return { daoInfo, loading };
};

export default useQueryDAOInfo;
