import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@chakra-ui/react";

// Layout component with a sidebar and a header using Chakra UI
const Layout = ({ children }: any) => {
  return (
    <>
      {/* <Sidebar /> */}
      {/* <Box ml="64" pt="20" backgroundColor={"black"}> */}
      <Header />
      <Box pt="20" backgroundColor={"black"}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
