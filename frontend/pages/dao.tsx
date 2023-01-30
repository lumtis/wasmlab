import Head from "next/head";
import { Container } from "@chakra-ui/react";

import Layout from "../layout/Layout";
import { DAO } from "../components/dao";
import BoxW from "../components/ui/box";
import { addresses } from "../config/addresses";

export default function DAOPage() {
  return (
    <Layout>
      <Container maxW="5xl" py={10}>
        <Head>
          <title>DAO</title>
        </Head>
        <BoxW width="fit-content">
          <DAO address={addresses.dao} />
        </BoxW>
      </Container>
    </Layout>
  );
}
