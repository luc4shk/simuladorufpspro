import React, { useEffect, useState,useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Button,
  Icon,
  Switch,
  useEditable,
  FormLabel
} from "@chakra-ui/react";
import { Link } from "wouter";
import Boton from "../pure/Boton";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from 'react-hot-toast';
export default function TablaEstudiantes({ columns, items, path, msg, showButton }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const [estudiantes, setEstudiantes] = useState()
  const itemsPerPage = 5;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [showActive,setShowActive] = useState(false);

  const {token} = useContext(AppContext)

  const currentItems = estudiantes && estudiantes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = estudiantes && Math.ceil(estudiantes.length / itemsPerPage);

  const handlePageChange = (selected) => {
    if (selected >= indexF) {
      setIndexI(selected);
      setIndexF(selected + 5);
    }
    setCurrentPage(selected);
  };

  const atrasPage = () => {
    currentPage <= indexI && indexI != 0 ? paginacionAtras() : null;

    currentPage > 0 ? handlePageChange(currentPage - 1) : null;
  };

  const adelantePage = () => {
    currentPage >= indexF - 1 ? paginacionAdelante() : null;
    currentPage < totalPages - 1 ? handlePageChange(currentPage + 1) : null;
  };

  const paginacionAdelante = () => {
    setIndexI(indexI + 5);
    setIndexF(indexF + 5);
  };

  const paginacionAtras = () => {
    setIndexI(indexI - 5);
    setIndexF(indexF - 5);
  };

  const obtenerEstudiantes = async ( id ) =>{
    let response = await axiosApi.get(`/api/user/student?estado=${id}`,{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error(e.response.data.error)
     })
     setEstudiantes(response.data)
  }

 useEffect(()=>{
  obtenerEstudiantes(1)
 },[]) 

  return (
    <div>
       <Flex align={"center"} gap={"5px"}>
        <FormLabel id="switch" m={"0"}>Mostrar Inactivos</FormLabel> 
        <Switch id="switch" colorScheme="cyan"  onChange={(e)=>{
            setCurrentPage(0)
            setShowActive(!showActive)
            showActive===true ? obtenerEstudiantes(1) : obtenerEstudiantes(0)
        }}/>
        </Flex>
      <Box mb="15px" mt="20px" p="20px" borderRadius="8px" bgColor="white">
        <Flex
          // w={["190px", "350px", "510px", "700px"]}
          w={{
            base: "240px",
            sm: "310px",
            md: "450px",
            lg: "690px",
            tableBreakpoint: "100%",
          }}
          gap={["8px", "0"]}
          direction={["column", "row"]}
          justifyContent={["flex-start", "space-between"]}
          alignItems="center"
          overflowX="auto"
        >
          <Box w="100%" overflowX="auto" mb={4}>
            <Table w="100%">
              <Thead>
                <Tr>
                  {columns.map((column, index) => (
                    <Th
                      textAlign="center"
                      key={index}
                      style={{
                        borderBottom: "2px solid",
                        borderBottomColor: "#E7ADA2",
                      }}
                    >
                      {column}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {estudiantes && estudiantes.map((item, index) => (
                  <Tr key={index}>
                      <Td>{item.nombre}</Td>
                      <Td>{item.apellido}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.estado ? "Activo" : "Inactivo"}</Td>
                      <Td>{item.semestre}</Td>
                      <Td>{item.codigo}</Td>
                    <Td>{
                        <Button variant={"unstyled"} as={Link} to={`/editarEstudiante/${item.id}`}>
                        <Icon w={"20px"} h={"20px"} as={RiEdit2Fill}/>
                        </Button>
                        }</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
      <Flex
        className="pagination"
        justifyContent={"center"}
        // gap={"5px"}
        // style={{ display: "flex", justifyContent: "center" }}
      >
        <Boton
          isDisabled={currentPage === 0}
          funcion={atrasPage}
          w={"30px"}
          radius={"50%"}
          msg={<Icon as={MdChevronLeft} boxSize={5} />}
        />
        {Array.from({ length: totalPages })
          .slice(indexI, indexF)
          .map((_, index) => {
            index = index + indexI;
            return (
              <Button
                key={index}
                onClick={() => {
                  handlePageChange(index);
                }}
                bgColor={currentPage === index ? "white" : "principal.100"}
                textColor={currentPage === index ? "black" : "white"}
                _hover={{
                  bgColor: currentPage === index ? "#F0847D" : "gray.300",
                }}
                w="30px"
                alignItems="center"
              >
                {index + 1}
              </Button>
            );
          })}
        <Boton
          isDisabled={currentPage === totalPages - 1}
          funcion={adelantePage}
          w={"30px"}
          radius={"50%"}
          msg={<Icon as={MdChevronRight} boxSize={5} />}
        />
      </Flex>
    </div>
  );
}