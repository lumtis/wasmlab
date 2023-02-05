import { Spinner, Heading } from "@chakra-ui/react";

import useQueryCW20Balance from "../hooks/query/useQueryCW20Balance";
import useQueryCW20Info from "../hooks/query/useQueryCW20Info";
import ContainerSpaced from "./ui/container-spaced";
import Code from "./ui/code";
import { convertMicroDenomToDenom } from "../utils/conversion";

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

  tokenInfo.decimals;

  let balanceComp = <Spinner />;
  if (!loadingBalance || !loadingTokenInfo) {
    balanceComp = (
      <ContainerSpaced>
        <Heading>{tokenInfo?.name} balance</Heading>
        <Code textAlign="right">
          {convertMicroDenomToDenom(balance, tokenInfo?.decimals)}
          {tokenInfo?.symbol}
        </Code>
      </ContainerSpaced>
    );
  }

  return balanceComp;
};
