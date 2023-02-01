import { Text } from "@chakra-ui/react";

import { CopyCard } from "../ui/copy-card";

import ContainerSpaced from "../ui/container-spaced";

export const TxConfirmed = ({ tx }: { tx: string }) => {
  return (
    <ContainerSpaced>
      <Text>Tx confirmed:</Text>
      <CopyCard address={tx} isLoading={false} />
    </ContainerSpaced>
  );
};
