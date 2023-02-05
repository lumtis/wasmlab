import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Spinner,
  Box,
  Container,
} from "@chakra-ui/react";

import Button from "./ui/button";
import useTxTokenMint from "../hooks/tx/useTxTokenMint";
import { TxConfirming } from "./tx/tx-confirming";
import { TxConfirmed } from "./tx/tx-confirmed";
import ContainerSpaced from "./ui/container-spaced";
import useQueryMinterToken from "../hooks/query/useQueryMinterToken";
import useQueryCW20Info from "../hooks/query/useQueryCW20Info";

import { convertDenomToMicroDenom } from "../utils/conversion";

// define an enum TxStatus that store the state of the tx, it is either none, confirming or confirmed
enum TxStatus {
  None,
  Confirming,
  Confirmed,
}

// TODOHERE: create a generic component for form with inputs that send txs, make one with single input
// TODOHERE: improve number input UI
export const Minter = ({
  contractAddress,
  recipientAddress,
}: {
  contractAddress: string;
  recipientAddress: string;
}) => {
  const { send, loading } = useTxTokenMint(contractAddress, recipientAddress);
  const [amount, setAmount] = useState("0");

  // fetch the token contract of the minter and its info
  const { token: tokenAddress } = useQueryMinterToken(contractAddress);
  const { tokenInfo, loading: loadingTokenInfo } = useQueryCW20Info(
    tokenAddress || ""
  );

  // store the state of the tx compnent
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.None);
  const [tx, setTx] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (amount && send) {
      const amountToSend = amount;
      setAmount("0");

      if (amountToSend === "0") {
        alert("Amount must be greater than 0");
        return;
      }

      // Convert to microdenom
      const microDenom = convertDenomToMicroDenom(
        amountToSend,
        tokenInfo?.decimals
      );

      // Send tx
      setTxStatus(TxStatus.Confirming);
      const res = await send(microDenom);

      // Set tx hash
      setTxStatus(TxStatus.Confirmed);
      setTx(res.transactionHash);
    }
  };

  // Submit button is disabled while loading
  let submitButton = <Spinner />;
  if (!loading && !loadingTokenInfo) {
    submitButton = (
      <Container display="flex" justifyContent="center" width="100%">
        <Button mt={4} type="submit">
          Mint
        </Button>
      </Container>
    );
  }

  // Show tx component
  let txComp = <></>;
  if (txStatus === TxStatus.Confirming) {
    txComp = <TxConfirming />;
  } else if (txStatus === TxStatus.Confirmed) {
    txComp = <TxConfirmed tx={tx} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <ContainerSpaced>
        <Heading>Mint {tokenInfo?.symbol}</Heading>
        <FormControl>
          <Box display="flex" flexDirection="row" alignItems="flex-end">
            <FormLabel htmlFor="amount">Amount:</FormLabel>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(event: any) => setAmount(event.target.value)}
            />
          </Box>
        </FormControl>
        {submitButton}
        {txComp}
      </ContainerSpaced>
    </form>
  );
};
