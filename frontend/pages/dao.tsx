import Head from "next/head";
import { Box, Heading } from "@chakra-ui/react";
import { useChain } from "@cosmos-kit/react";

import Layout from "../layout/Layout";
import { DAOConfig } from "../components/dao-config";
import BoxW from "../components/ui/box";
import { addresses } from "../config/addresses";
import ContainerPage from "../components/ui/container-page";
import { Staking } from "../components/staking";
import { chainName } from "../config";

export default function DAOPage() {
  const { address } = useChain(chainName);

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>DAO</title>
        </Head>
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={3}
          >
            DAO
          </Heading>
        </Box>
        <BoxW width="fit-content">
          <DAOConfig address={addresses.dao} />
        </BoxW>
        <BoxW width="fit-content">
          <Staking stakingContract={addresses.staking} address={address} />
        </BoxW>
      </ContainerPage>
    </Layout>
  );
}
