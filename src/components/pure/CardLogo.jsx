import { Box, Button, Center, Image } from "@chakra-ui/react";
import React from "react";

export default function CardLogo({ children, wd, hg }) {
  return (
    <Center h="100vh" bg="gray.100">
      <Box
        bg="white"
        width={wd}
        height={hg}
        borderWidth="1px"
        borderRadius="20px"
        overflow="hidden"
        pt="10px"
        px={8}
        boxShadow="lg"
      >
        <Image
          src="https://i.postimg.cc/VkY33Z1x/Logo1.jpg"
          borderRadius="full"
          boxSize="150px"
          mx="auto"
          my={0}
          alt="Logo"
        />
        {children}
      </Box>
    </Center>
  );
}
