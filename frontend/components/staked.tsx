import { Spinner, Heading } from "@chakra-ui/react";

import ContainerSpaced from "./ui/container-spaced";
import Code from "./ui/code";

import useQueryStakedValue from "../hooks/query/useQueryStakedValue";
import useGetStakingDenom from "../hooks/useGetStakingDenom";

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
  const { denom, loading: loadingDenom } = useGetStakingDenom(contractAddress);

  let stakedComp = <Spinner />;
  if (!loadingStaked || !loadingDenom) {
    stakedComp = (
      <ContainerSpaced>
        <Heading fontSize={{ sm: "2xl", md: "3xl" }}>Staked</Heading>
        <Code textAlign="right">
          {staked}
          {denom}
        </Code>
      </ContainerSpaced>
    );
  }

  return stakedComp;
};
