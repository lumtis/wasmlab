import { Spinner, Heading } from "@chakra-ui/react";

import useQueryCW20Balance from "../hooks/query/useQueryCW20Balance";
import useQueryCW20Info from "../hooks/query/useQueryCW20Info";
import ContainerSpaced from "./ui/container-spaced";

import Code from "./ui/code";

export const Balance = ({
  contractAddress,
  address,
}: {
  contractAddress: string;
  address: string;
}) => {
  // fetch balance and token info
  const { balance, loading: loadingBalance } = useQueryCW20Balance(
    contractAddress,
    address
  );
  const { tokenInfo, loading: loadingTokenInfo } =
    useQueryCW20Info(contractAddress);

  let balanceComp = <Spinner />;
  if (!loadingBalance || !loadingTokenInfo) {
    balanceComp = (
      <ContainerSpaced>
        <Heading>{tokenInfo?.name} balance</Heading>
        <Code textAlign="right">
          {balance}
          {tokenInfo?.symbol}
        </Code>
      </ContainerSpaced>
    );
  }

  return balanceComp;
};
