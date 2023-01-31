import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Spinner,
} from "@chakra-ui/react";

import Button from "./ui/button";
import useTxTokenMint from "../hooks/useTxTokenMint";
import { TxConfirming } from "./tx/tx-confirming";
import { TxConfirmed } from "./tx/tx-confirmed";

// define an enum TxStatus that store the state of the tx, it is either none, confirming or confirmed
enum TxStatus {
  None,
  Confirming,
  Confirmed,
}

export const Minter = ({ contractAddress }: { contractAddress: string }) => {
  const { send, loading } = useTxTokenMint(contractAddress);
  const [amount, setAmount] = useState("0");

  // store the state of the tx compnent
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.None);
  const [tx, setTx] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (amount) {
      const amountToSend = amount;
      setAmount("0");

      if (amountToSend === "0") {
        alert("Amount must be greater than 0");
        return;
      }

      // Send tx
      setTxStatus(TxStatus.Confirming);
      const res = await send(amountToSend);

      // Set tx hash
      setTxStatus(TxStatus.Confirmed);
      setTx(res.transactionHash);
    }
  };

  // Submit button is disabled while loading
  let submitButton = (
    <Button mt={4}>
      <Spinner />
    </Button>
  );
  if (!loading) {
    submitButton = (
      <Button mt={4} type="submit">
        Mint
      </Button>
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
      <Heading>Mint</Heading>
      <FormControl>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <Input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(event: any) => setAmount(event.target.value)}
        />
      </FormControl>
      {submitButton}
      {txComp}
    </form>
  );
};
