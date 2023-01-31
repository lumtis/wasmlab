import { Box, Link, Heading } from "@chakra-ui/react";
import { useChain } from "@cosmos-kit/react";
import { MouseEventHandler } from "react";

import links from "../config/navlinks";

import {
  Error,
  Connected,
  Connecting,
  CopyAddressBtn,
  Disconnected,
  NotExist,
  Rejected,
  WalletConnectComponent,
} from "../components";
import { CopyCard } from "../components/copy-card";
import { chainName } from "../config";

// Header is a simple empty header with a gray background using Chakra UI
const Header = () => {
  const { connect, openView, status, address } = useChain(chainName);

  // Events
  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault();
    await connect();
  };

  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault();
    openView();
  };

  // List of components for the navigation bar
  const navLinks = links.map((link) => (
    <Box p="4" display="flex" alignItems="center" key={link.key}>
      <Heading size="md" letterSpacing={"tighter"}>
        <Link
          _hover={{
            color: "primary",
            textDecoration: "none",
          }}
          href={link.href}
        >
          {link.label}
        </Link>
      </Heading>
    </Box>
  ));

  // The header contains a string "hello" on the right side of the bar
  return (
    <Box as="header" h="20" bg="black" p="15px">
      <Box
        as="nav"
        p="4"
        display="flex"
        justifyContent="flex-end"
        float={"left"}
      >
        {navLinks}
      </Box>
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
            connected={<CopyCard address={address} isLoading={false} />}
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
