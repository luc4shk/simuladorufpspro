import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'wouter'
import React from 'react'

export default function ErrorPage() {
  return (
    <Flex
      // w={isOpen ? "100%" : ["calc(100% - 70px)","calc(100% - 70px)","calc(100% - 200px)"]}
      minHeight={"100vh"}
      // left={isOpen ? "0px" : ["70px","70px","200px"]}
      position={"relative"}
      transition={"all 0.5s"}
      flexDir={"column"}
      bgColor={"secundario.100"}
      >
      <Flex position={"relative"} w={"100%"} h={"100%"}>
      <Text>404 Error</Text>
      <Button as={Link} to="/">Go to Home</Button>
    </Flex>
    </Flex>
    

  )
}
