import "./App.css";
import { ButtonConnect } from "./components/ButtonConnect";
import { useRecoilState } from "recoil";
import { walletState, WalletStatusType } from "./state/atoms/walletAtoms";
import { useConnectWallet } from "./hooks/useConnectWallet";

export const Content = () => {
  const { mutate: connectWallet } = useConnectWallet();
  const [{ key, address, status }, setWalletState] =
    useRecoilState(walletState);

  return (
    <ButtonConnect
      connected={Boolean(key?.name)}
      walletName={key?.name}
      onConnect={() => connectWallet(null)}
    />
  );
};
