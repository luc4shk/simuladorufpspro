import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

export default function NavBar({ changeOpen, msg, isOpen }) {
  return (
    <Flex
      w={"100%"}
      bgColor={"white"}
      borderBottom={"2px solid #bbb"}
      h={"60px"}
      p={"10px"}
      alignItems={"center"}
      gap={"20px"}
    >
      <Icon
        cursor={"pointer"}
        onClick={() => {
          changeOpen();
        }}
        as={isOpen ? AiOutlineMenuUnfold : AiOutlineMenuFold}
        fontSize={"20px"}
      ></Icon>
      <Text>{msg}</Text>
    </Flex>
  );
}
