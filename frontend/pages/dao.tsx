import Head from "next/head";

import Layout from "../layout/Layout";
import { DAO } from "../components/dao";
import BoxW from "../components/ui/box";
import { addresses } from "../config/addresses";
import ContainerW from "../components/ui/container";

export default function DAOPage() {
  return (
    <Layout>
      <ContainerW>
        <Head>
          <title>DAO</title>
        </Head>
        <BoxW width="fit-content">
          <DAO address={addresses.dao} />
        </BoxW>
      </ContainerW>
    </Layout>
  );
}
