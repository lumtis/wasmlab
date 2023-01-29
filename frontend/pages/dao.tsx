import Head from "next/head";
import { Box, Heading, Container } from "@chakra-ui/react";

import Layout from "../layout/Layout";
import { DAO } from "../components/dao";

export default function DAOPage() {
  return (
    <Layout>
      <Container maxW="5xl" py={10}>
        <Head>
          <title>DAO</title>
        </Head>
        <DAO address="juno17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgszu8fr9" />
      </Container>
    </Layout>
  );
}
