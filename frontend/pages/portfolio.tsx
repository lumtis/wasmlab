import Head from "next/head";
import { Heading, Box, Container, Spinner } from "@chakra-ui/react";
import { useChain } from "@cosmos-kit/react";

import Layout from "../layout/Layout";
import { Balance } from "../components/balance";
import BoxW from "../components/ui/box";
import { chainName } from "../config";
import { addresses } from "../config/addresses";
import { Minter } from "../components/minter";

export default function Home() {
  const { address } = useChain(chainName);

  let BalanceComp = <Spinner />;
  if (address) {
    BalanceComp = (
      <Balance contractAddress={addresses.fooCW20} address={address} />
    );
  }

  return (
    <Layout>
      <Container maxW="5xl" py={10}>
        <Head>
          <title>WasmLabs</title>
          <meta name="description" content="New blockchain application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={3}
          >
            Portfolio 💼
          </Heading>
        </Box>
        <BoxW width="fit-content">{BalanceComp}</BoxW>
        <BoxW width="fit-content">
          <Minter contractAddress={addresses.fooMinter} />
        </BoxW>
      </Container>
    </Layout>
  );
}
