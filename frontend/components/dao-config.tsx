import { Text, Heading, Spinner, Box, Image } from "@chakra-ui/react";

import useQueryDAOConfig from "../hooks/query/useQueryDAOConfig";
import ContainerSpaced from "./ui/container-spaced";
import { CopyCard } from "./ui/copy-card";

// DAO is a react component that renders DAO information from the address of a DAO contract
export const DAOConfig = ({
  address,
  logoSize,
}: {
  address: string;
  logoSize?: string;
}) => {
  const { daoConfig, loading } = useQueryDAOConfig(address);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ContainerSpaced>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Heading>{daoConfig?.name}</Heading>
        <Box
          margin={10}
          border="2px"
          borderColor="secondary"
          borderRadius="50%"
        >
          <Image
            src={daoConfig?.image}
            alt="DAO logo"
            borderRadius="50%"
            h={logoSize || 40}
            w={logoSize || 40}
          />
        </Box>
      </Box>
      <Text>{daoConfig?.description}</Text>
      <CopyCard address={daoConfig?.address} />
    </ContainerSpaced>
  );
};
