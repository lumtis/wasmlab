import { Text, Heading, Spinner } from "@chakra-ui/react";

import useQueryDAOInfo from "../hooks/useQueryDAOInfo";
import ContainerSpaced from "./ui/container-spaced";
import { CopyCard } from "./ui/copy-card";

// DAO is a react component that renders DAO information from the address of a DAO contract
export const DAOConfig = ({ address }: { address: string }) => {
  const { daoInfo, loading } = useQueryDAOInfo(address);

  if (loading) {
    return <Spinner />;
  }
  console.log(daoInfo);

  return (
    <ContainerSpaced>
      <Heading>{daoInfo?.name}</Heading>
      <Text>{daoInfo?.description}</Text>
      <CopyCard address={daoInfo?.address} />
    </ContainerSpaced>
  );
};
