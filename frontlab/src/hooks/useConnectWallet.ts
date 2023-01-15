import {
  createWasmAminoConverters,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import {
  AminoTypes,
  createIbcAminoConverters,
  GasPrice,
} from "@cosmjs/stargate";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";

import { walletState, WalletStatusType } from "../state/atoms/walletAtoms";
import { GAS_PRICE, CHAIN_ID, CHAIN_RPC } from "../util/constants";

export const useConnectWallet = (
  mutationOptions?: Parameters<typeof useMutation>[2]
) => {
  const [{ status }, setWalletState] = useRecoilState(walletState);

  const mutation = useMutation(async () => {
    /* set the fetching state */
    setWalletState((value) => ({
      ...value,
      client: null,
      state: WalletStatusType.connecting,
    }));

    try {
      await window.keplr.enable(CHAIN_ID);

      const offlineSigner = await window.getOfflineSignerAuto?.(CHAIN_ID);
      const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
        CHAIN_RPC,
        offlineSigner,
        {
          gasPrice: GasPrice.fromString(GAS_PRICE),
          /*
           * passing ibc amino types for all the amino signers (eg ledger, wallet connect)
           * to enable ibc & wasm transactions
           * */
          aminoTypes: new AminoTypes(
            Object.assign(
              createIbcAminoConverters(),
              createWasmAminoConverters()
            )
          ),
        }
      );

      const [{ address }] = await offlineSigner.getAccounts();
      const key = await window.keplr?.getKey(CHAIN_ID);

      /* successfully update the wallet state */
      setWalletState({
        key,
        address,
        client: wasmChainClient,
        status: WalletStatusType.connected,
      });
    } catch (e) {
      /* set the error state */
      setWalletState({
        key: null,
        address: "",
        client: null,
        status: WalletStatusType.error,
      });

      /* throw the error for the UI */
      throw e;
    }
  }, mutationOptions);

  useEffect(
    function restoreWalletConnectionIfHadBeenConnectedBefore() {
      /* restore wallet connection if the state has been set with the */
      if (CHAIN_RPC && status === WalletStatusType.restored) {
        mutation.mutate(null);
      }
    }, // eslint-disable-next-line
    [status, CHAIN_RPC]
  );

  useEffect(
    function listenToWalletAddressChangeInKeplr() {
      function reconnectWallet() {
        if (status === WalletStatusType.connected) {
          mutation.mutate(null);
        }
      }

      window.addEventListener("keplr_keystorechange", reconnectWallet);
      return () => {
        window.removeEventListener("keplr_keystorechange", reconnectWallet);
      };
    },
    // eslint-disable-next-line
    [status]
  );

  return mutation;
};
