import { Spinner, Heading } from "@chakra-ui/react";

import ContainerSpaced from "./ui/container-spaced";
import Code from "./ui/code";

import useQueryStakedValue from "../hooks/query/useQueryStakedValue";
import useGetStakingTokenInfo from "../hooks/useGetStakingTokenInfo";

import { convertMicroDenomToDenom } from "../utils/conversion";

export const Staked = ({
  contractAddress,
  address,
}: {
  contractAddress: string;
  address: string;
}) => {
  // fetch staked and token denom
  const { staked, loading: loadingStaked } = useQueryStakedValue(
    contractAddress,
    address
  );
  const { tokenInfo, loading: loadingDenom } =
    useGetStakingTokenInfo(contractAddress);

  // convert staked from decimal
  const stakedConv = convertMicroDenomToDenom(staked, tokenInfo?.decimals);

  let stakedComp = <Spinner />;
  if (!loadingStaked || !loadingDenom) {
    stakedComp = (
      <ContainerSpaced>
        <Heading fontSize={{ sm: "2xl", md: "3xl" }}>Staked</Heading>
        <Code textAlign="right">
          {stakedConv}
          {tokenInfo?.symbol}
        </Code>
      </ContainerSpaced>
    );
  }

  return stakedComp;
};
