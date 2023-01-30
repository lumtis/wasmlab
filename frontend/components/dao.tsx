import { Text, Heading, Spinner } from "@chakra-ui/react";

import useQueryDAOInfo from "../hooks/useQueryDAOInfo";

// DAO is a react component that renders DAO information from the address of a DAO contract
export const DAO = ({ address }: { address: string }) => {
  const { daoInfo, loading } = useQueryDAOInfo(address);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading>{daoInfo?.name}</Heading>
      <Text>{daoInfo?.description}</Text>
      <Text>{daoInfo?.address}</Text>
    </div>
  );
};
