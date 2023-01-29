import { Box } from "@chakra-ui/react";
import { useChain } from "@cosmos-kit/react";
import { MouseEventHandler } from "react";

import {
  Error,
  Connected,
  ConnectedShowAddress,
  Connecting,
  CopyAddressBtn,
  Disconnected,
  NotExist,
  Rejected,
  WalletConnectComponent,
} from "../components";
import { chainName } from "../config";

// Header is a simple empty header with a gray background using Chakra UI
const Header = () => {
  const { connect, openView, status, address, chain } = useChain(chainName);

  // Events
  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault();
    await connect();
  };

  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault();
    openView();
  };

  // The header contains a string "hello" on the right side of the bar
  return (
    <Box as="header" h="20" bg="black">
      <Box
        as="nav"
        p="4"
        display="flex"
        justifyContent="flex-end"
        float={"right"}
      >
        <Box paddingX="2">
          <CopyAddressBtn
            walletStatus={status}
            connected={
              <ConnectedShowAddress address={address} isLoading={false} />
            }
          />
        </Box>
        <Box paddingX="2">
          <WalletConnectComponent
            walletStatus={status}
            disconnect={
              <Disconnected
                buttonText="Connect Wallet"
                onClick={onClickConnect}
              />
            }
            connecting={<Connecting />}
            connected={
              <Connected buttonText={"My Wallet"} onClick={onClickOpenView} />
            }
            rejected={
              <Rejected buttonText="Reconnect" onClick={onClickConnect} />
            }
            error={
              <Error buttonText="Change Wallet" onClick={onClickOpenView} />
            }
            notExist={
              <NotExist buttonText="Install Wallet" onClick={onClickOpenView} />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
