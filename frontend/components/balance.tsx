import { Text, Spinner } from "@chakra-ui/react";

import useQueryCW20Balance from "../hooks/useQueryCW20Balance";
import useQueryCW20Info from "../hooks/useQueryCW20Info";

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
      <Text>
        {tokenInfo?.name}: {balance}
        {tokenInfo?.symbol}
      </Text>
    );
  }

  return balanceComp;
};
