import {React, useState, useContext, useEffect, useRef} from "react";
import { Input, Flex, Box, Button, Image, Icon, useEditable } from "@chakra-ui/react";
import { Link } from "wouter";
import { RiEdit2Fill } from "react-icons/ri";
import Boton from "../pure/Boton";
import axiosApi from "../../utils/config/axios.config";
import { getAdministratorById } from "../../services/user/axios.service";
import { AppContext } from "../context/AppProvider";

export default function AdminProfileForm() {

  const {token, setToken, imagen} = useContext(AppContext)
  const [adminData, setAdminData] = useState()
  const [data, setData] = useState({})

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const direccionRef = useRef(null);
  const correoRef = useRef(null);
  const documentoRef = useRef(null);
  const celularRef = useRef(null);
  const telefonoRef = useRef(null);
  const codigoRef = useRef(null);

  useEffect(()=>{
    getAdminById(1)
  },[])
  const getAdministratorById = async (id) =>{

    let response = await axiosApi.get(`/api/user/admin/${id}`,{
        headers:{ Authorization:"Bearer " + token},
    })
    return response.data
    
}

  const getAdminById = async (id) =>{
     const data = await getAdministratorById(id)
     
     setData({
        nombre:data.nombre,
        apellido:data.apellido,
        direccion:data.direccion,
        email: data.email,
        documento: data.documento,
        celular: data.celular,
        telefono: data.telefono,
        codigo: data.codigo
     })
  }

  return (
    <>
      <Box
        p={"20px"}
        borderRadius={"8px"}
        bgColor={"white"}
        minW={["200px", "350px", "400px", "500px"]}
        maxHeight={"auto"}
        overflow={"hidden"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          w={"100%"}
          h={"100%"}
          gap={"20px"}
          action=""
        >
          <Box
            display="flex"
            dir="row"
            position={"relative"}
            justifyContent={"center"}
            w={"100%"}
          >
            <Image
              src={imagen}
              width={["70px", "100px", "130px"]}
              height={["70px", "100px", "130px"]}
              borderRadius={"50%"}
              objectFit={"cover"}
              objectPosition={"center"}
            />
            <Button
              position={"absolute"}
              minW={["21px", "27px", "30px"]}
              padding={"0"}
              height={["21px", "27px", "30px"]}
              top={["50px", "73px", "100px"]}
              left={["125px", "180px", "210px", "260px"]}
              borderRadius={"50%"}
              backgroundColor={"principal.100"}
              as={Link}
              to="/cambiarImagen"
              _hover={"none"}
              _active={"none"}
            >
              <Icon color="white" as={RiEdit2Fill} />
            </Button>
          </Box>
          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="nombre">Nombre</label>
              <Input
                value={data && data.nombre}
                ref={nombreRef}
                mt={"10px"}
                id="nombre"
                name="nombre"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="apellido">Apellido</label>
              <Input
                value={data && data.apellido}
                ref={apellidoRef}
                mt={"10px"}
                id="apellido"
                name="apellido"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Flex>
          <Flex flexDir={"column"}>
            <label htmlFor="direccion">Dirección</label>
            <Input
                value={data && data.direccion}
                ref={direccionRef}
              mt={"10px"}
              id="direccion"
              name="direccion"
              type="text"
              w={"100%"}
              disabled
            ></Input>
          </Flex>
          <Flex flexDir={"column"}>
            <label htmlFor="correo">Correo Institucional</label>
            <Input
                value={data && data.email}
              ref={correoRef}
              mt={"10px"}
              id="correo"
              name="correo"
              type="text"
              w={"100%"}
              disabled
            ></Input>
          </Flex>

          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="documento">Número de Documento</label>
              <Input
                value={data && data.documento}
              ref={documentoRef}
                mt={"10px"}
                id="documento"
                name="documento"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="celular">Celular</label>
              <Input
                value={data && data.celular}
              ref={celularRef}
                mt={"10px"}
                id="celular"
                name="celular"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Flex>
          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="telefono">Teléfono</label>
              <Input
                value={data && data.telefono}
              ref={telefonoRef}
                mt={"10px"}
                id="telefono"
                name="telefono"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="codigo">Código</label>
              <Input
                value={data && data.codigo}
              ref={codigoRef}
                mt={"10px"}
                id="codigo"
                name="codigo"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Flex>
          <Flex
            flexDirection={["column", "column", "row", "row", "row"]}
            w={"100%"}
            gap={["8px", "8px", "0"]}
            justifyContent={"space-between"}
          >
            {/* <Button bgColor={"principal.100"} textColor={"white"} w={["100%","100%","170px"]}>
                Editar Información
              </Button> */}
            <Boton
              as={"link"}
              path={"/editarInformacion"}
              msg={"Editar Información"}
              w={["100%", "100%", "160px", "185px", "200px"]}
            />
            <Boton
              as={"link"}
              path={"/cambiarContrasenia"}
              msg={"Cambiar Contraseña"}
              w={["100%", "100%", "160px", "185px", "200px"]}
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
