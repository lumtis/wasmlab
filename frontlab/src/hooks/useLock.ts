import { useRecoilValue } from "recoil";

import { walletState, WalletStatusType } from "../state/atoms/walletAtoms";
import { VaultClient } from "../clients/vault/Vault.client";

export const useLock = () => {
  const { client, address, status } = useRecoilValue(walletState);
  const vaultAddress =
    "juno1ah5xxylq7rfnrldn0rtvlm77gpfk3jhlq9jq40z573u6dx0awnvqqnz2f5";

  let vaultClient = new VaultClient(client, address, vaultAddress);
  return () => vaultClient.lock({ addr: address, amount: 1000 });
};
