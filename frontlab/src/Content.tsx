import "./App.css";
import { ButtonConnect } from "./components/ButtonConnect";
import { useRecoilState } from "recoil";
import { walletState, WalletStatusType } from "./state/atoms/walletAtoms";
import { useConnectWallet } from "./hooks/useConnectWallet";
import BalanceAvailable from "./components/BalanceAvailable";
import ButtonLock from "./components/ButtonLock";
import { useLock } from "./hooks/useLock";

export const Content = () => {
  const { mutate: connectWallet } = useConnectWallet();
  const lock = useLock();
  const [{ key, address, status }, setWalletState] =
    useRecoilState(walletState);

  return (
    <div>
      <ButtonConnect
        connected={Boolean(key?.name)}
        walletName={key?.name}
        onConnect={() => connectWallet(null)}
      />
      <BalanceAvailable />
      <ButtonLock onLock={() => lock()} />
    </div>
  );
};
