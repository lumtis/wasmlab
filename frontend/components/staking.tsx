import { Heading, Spinner } from "@chakra-ui/react";

import ContainerSpaced from "./ui/container-spaced";
import { Staked } from "./staked";
import { Staker } from "./staker";
import { Unstaker } from "./unstaker";

export const Staking = ({
  stakingContract,
  address,
}: {
  stakingContract: string;
  address?: string;
}) => {
  if (!address) {
    return <Spinner />;
  }
  return (
    <ContainerSpaced>
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Staking</Heading>
      <Staked contractAddress={stakingContract} address={address} />
      <Staker stakingContract={stakingContract} />\
      <Unstaker stakingContract={stakingContract} />
    </ContainerSpaced>
  );
};
