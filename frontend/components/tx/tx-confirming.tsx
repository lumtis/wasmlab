// This component shows a string "confirming tx.." with a spinner using Chakra UI

import { Text, Spinner } from "@chakra-ui/react";

export const TxConfirming = () => {
  return (
    <Text>
      Confirming tx... <Spinner />
    </Text>
  );
};
