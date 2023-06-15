import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, useMediaQuery} from "@chakra-ui/react"
import SideItem from './pure/SideItem'
import { AiOutlineFlag,
         AiOutlineHome,
         AiOutlineAppstore, 
         AiOutlineCalendar, 
         AiOutlineTeam,
         AiOutlineFileAdd,
         AiOutlineBook } from 'react-icons/ai';

import {BiLogOut} from "react-icons/bi"
import { AppContext } from './context/AppProvider';
export default function SideBar({isOpen}) {

  const {open, change} = useContext(AppContext)

  const navItems = [
    {icon:AiOutlineHome,msg:"Panel Principal",active:false,path:"/"},
    {icon:AiOutlineFlag,msg:"Competencias",active:false,path:"/competencias"},
    {icon:AiOutlineAppstore,msg:"Categorías",active:false,path:"/categorias"},
    {icon:AiOutlineCalendar,msg:"Preguntas",active:false,path:"/preguntas"},
    {icon:AiOutlineTeam,msg:"Estudiantes",active:false,path:"/estudiantes"},
    {icon:AiOutlineFileAdd,msg:"Pruebas",active:false,path:"/pruebas"},
    {icon:AiOutlineBook,msg:"Convocatorias",active:false, path:"/convocatorias"},
  ]
  
  const [items, setItems] = useState(navItems)
 const [w] = useMediaQuery("(min-width: 768px)");
 

  return (
    <>
        <Flex 
        boxSizing='border-box'
        direction={"column"}
        position={"absolute"}
        w={["70px","70px","200px"]}
        h={"100%"}
        alignItems={"center"}
        backgroundColor={"principal.100"}
        padding={"15px"}
        justifyContent={"space-between"}
        transform={ isOpen ? "translateX(-100%)" : "translateX(0px)"}
        transition={"all 0.5s"}
        overflow={"hidden"}
        borderRight={"1px solid #bbb"}
        >
        <Flex
          direction={"column"}
          width={"100%"}
          gap={"15px"} 
        >

        {
          items.map( ({icon, msg, active, path}, i) => <SideItem key={i} path={path} icon={icon} active={active} msg={w ? msg : ""} tamanio={w} index={i}/> ) 
        }
        </Flex>
        <SideItem icon={BiLogOut} msg={w ? "Cerrar Sesión" : ""} index={10000}></SideItem>
        </Flex>
    </>
  )
}


