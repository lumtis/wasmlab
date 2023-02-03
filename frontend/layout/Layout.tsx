import { Box } from "@chakra-ui/react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Layout component with a sidebar and a header using Chakra UI
const Layout = ({ children }: any) => {
  return (
    <>
      {/* <Sidebar /> */}
      {/* <Box ml="64" pt="20" backgroundColor={"black"}> */}
      <Header />
      <Box pt="10" backgroundColor={"black"}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
