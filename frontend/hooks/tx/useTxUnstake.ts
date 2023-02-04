import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";

import useTx from "../ustTx";

const useTxUnstake = (
  contractAddress: string
): {
  send?: (amount: string) => Promise<ExecuteResult>;
  loading: boolean;
} => {
  const { send: sendTx, loading } = useTx(contractAddress);

  if (loading || !sendTx) {
    return { loading };
  }

  const send = async (amount: string) => {
    const msg = {
      unstake: { amount },
    };
    return await sendTx(msg);
  };

  return { send, loading };
};

export default useTxUnstake;
