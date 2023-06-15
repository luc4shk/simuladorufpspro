import { Button } from '@chakra-ui/react'
import { Link } from 'wouter'
import React from 'react'

export default function Boton({leftIcon,msg,w,path,type,mt,as,isDisabled,funcion, bgcolor="principal.100", txtcolor="white", radius, hvcolor="#F0847D"}) {
  return (
    <Button
    bgColor={bgcolor}
    w={w}
    color={txtcolor}
    borderRadius={radius}
    _hover={
        {
            bgColor: hvcolor
        }
    }
    disabled={isDisabled}
    onClick={funcion}
    leftIcon={leftIcon}
    mt={mt}
    cursor={"pointer"}
    type={type==="submit" ? "submit" : "none"}
    as={as==="link" ? Link : "none"}
    to={path}
    _active={"none"}
    >{msg}</Button>
  )
}
