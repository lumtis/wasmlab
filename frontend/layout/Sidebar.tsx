import { Box, Heading, Link } from "@chakra-ui/react";

// Sidebar navigation component with links to index and dao pages using Chakra UI
const Sidebar = () => {
  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      top="0"
      bottom="0"
      w="64"
      bg="black"
      color="white"
      overflowY="auto"
      borderRightWidth={"5px"}
    ></Box>
  );
};

export default Sidebar;
