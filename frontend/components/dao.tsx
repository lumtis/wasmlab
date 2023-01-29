import { Text, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useChain } from "@cosmos-kit/react";
import { DaoCoreQueryClient } from "../clients/DaoCore.client";
import { chainName } from "../config";

import Box from "./ui/box";

// DAOInfo is a type that represents DAO information
export type DAOInfo = {
  name: string;
  description: string;
  address: string;
};

// DAO is a react component that renders DAO information from the address of a DAO contract
export const DAO = ({ address }: { address: string }) => {
  const chain = useChain(chainName);
  const [dao, setDAO] = useState<DAOInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDAO = async () => {
      const client = await chain.getCosmWasmClient();
      const queryClient = new DaoCoreQueryClient(client, address);
      const config = await queryClient.config();
      const daoInfo: DAOInfo = {
        name: config.name,
        description: config.description,
        address: address,
      };
      setDAO(daoInfo);
      setLoading(false);
    };

    if (chain.wallet) {
      getDAO();
    }
  }, [chain, address]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>{dao?.name}</Heading>
      <Text>{dao?.description}</Text>
      <Text>{dao?.address}</Text>
    </Box>
  );
};
