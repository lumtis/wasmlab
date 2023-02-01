import { Container, VStack } from "@chakra-ui/react";

const ContainerW = ({ children, ...props }: any) => {
  return (
    <Container maxW="5xl" py={10}>
      <VStack spacing={8} align="stretch">
        {children}
      </VStack>
    </Container>
  );
};

export default ContainerW;
