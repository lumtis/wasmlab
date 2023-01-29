import Head from "next/head";
import { Heading, Box, Container } from "@chakra-ui/react";

import Layout from "../layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Container maxW="5xl" py={10}>
        <Head>
          <title>WasmLabs</title>
          <meta name="description" content="New blockchain application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={3}
          >
            Welcome to wasmlab 🧪
          </Heading>
        </Box>
      </Container>
    </Layout>
  );
}
