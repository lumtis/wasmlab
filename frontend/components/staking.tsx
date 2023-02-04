import { Heading, Spinner } from "@chakra-ui/react";

import ContainerSpaced from "./ui/container-spaced";
import { Staked } from "./staked";
import { Staker } from "./staker";
import { Unstaker } from "./unstaker";

// TODO: remove cw20Contract and fetch it from the staking contract inside the staker component
export const Staking = ({
  stakingContract,
  cw20Contract,
  address,
}: {
  stakingContract: string;
  cw20Contract: string;
  address?: string;
}) => {
  if (!address) {
    return <Spinner />;
  }
  return (
    <ContainerSpaced>
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Staking</Heading>
      <Staked contractAddress={stakingContract} address={address} />
      <Staker stakingContract={stakingContract} cw20Contract={cw20Contract} />\
      <Unstaker stakingContract={stakingContract} />
    </ContainerSpaced>
  );
};
