import { Button, Flex, Icon, Select, Text } from '@chakra-ui/react'
import { useLocation, Link} from 'wouter'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppProvider'
export default function SideItem({icon, msg, active, index, tamanio, path}) {
    
     const [ruta, setRuta] = useState(path)
     const [loc, setLoc] = useLocation()
    const {token, setToken} = useContext(AppContext)
    return (
    <>
    <Button
        as={Link} 
        to={ruta !== undefined ? ruta : ""}
        w={'100%'}
        borderRadius={"8px"}
        _hover={{
            backgroundColor: "#E7CECA",
            textDecoration:"none"
        }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        variant={'unstyled'}
        fontWeight={"semibold"}
        onClick={()=>{
            if(index===10000){
                setToken(localStorage.removeItem("token"))
                localStorage.removeItem("token")
                setLoc("/")
            } 
        }} 
    >
        <Flex  w={"100%"} gap={"15px"} p={"10px"}  justifyContent={tamanio ? 'flex-start' : 'center'} alignItems={"center"}>
            <Icon as={icon} color={ loc==ruta ? "white" : null } fontSize="25px"/>
            {msg!="" ? <Text>{msg}</Text> : msg}
        </Flex>
    
    </Button>
    </>
    )
}

