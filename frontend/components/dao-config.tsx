import { Text, Heading, Spinner } from "@chakra-ui/react";

import useQueryDAOConfig from "../hooks/query/useQueryDAOConfig";
import ContainerSpaced from "./ui/container-spaced";
import { CopyCard } from "./ui/copy-card";

// DAO is a react component that renders DAO information from the address of a DAO contract
export const DAOConfig = ({ address }: { address: string }) => {
  const { daoConfig, loading } = useQueryDAOConfig(address);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ContainerSpaced>
      <Heading>{daoConfig?.name}</Heading>
      <Text>{daoConfig?.description}</Text>
      <CopyCard address={daoConfig?.address} />
    </ContainerSpaced>
  );
};
