import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { toWasmMsg } from "../../utils/conversion";

import useTx from "../ustTx";

// TODOHERE: rename to stake and create another send hook
const useTxTokenSend = (
  contractAddress: string,
  contractRecipient: string
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
      send: {
        contract: contractRecipient,
        amount,
        msg: toWasmMsg({ stake: {} }),
      },
    };
    return await sendTx(msg);
  };

  return { send, loading };
};

export default useTxTokenSend;
