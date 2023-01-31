import { Text } from "@chakra-ui/react";

import { CopyCard } from "../copy-card";

export const TxConfirmed = ({ tx }: { tx: string }) => {
  return (
    <Text>
      Tx confirmed: <CopyCard address={tx} isLoading={false} />
    </Text>
  );
};
