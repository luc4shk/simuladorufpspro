import {React, useEffect, useState, useContext} from "react";
import {
  Input,
  Flex,
  Box,
  Button,
  Image,
  Icon,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import Boton from "../pure/Boton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { Toaster, toast } from "react-hot-toast";
import { Redirect, useLocation } from "wouter";
export default function EditarInformacionAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({})
  const [loc,navigation] = useLocation()
  const {token, setToken} = useContext(AppContext)


    useEffect(()=>{
    getAdminById(1)
  },[])

  const getAdministratorById = async (id) =>{

    let response = await axiosApi.get(`/api/user/admin/${id}`,{
        headers:{ Authorization:"Bearer " + token},
    })
    return response.data
    
}
 

const actualizarDatos = async (nombre, apellido, direccion, email, documento, celular, telefono, codigo, estado=true) =>{

    let response = await axiosApi.put(`api/user/admin/update/${1}`,{
        nombre:nombre,
        apellido:apellido,
        direccion: direccion,
        email: email,
        documento: documento,
        celular: celular,
        telefono: telefono,
        codigo: codigo,
        estado: true
    },{
       headers: {
            "Content-Type": "application/json",
            Authorization:"Bearer " + token
        },
      }

    ).catch((e)=>{
      toast.error("¡Error al actualizar los datos!")
    })

    if(response.status === 200){
      toast.success("¡Datos Actualizados!")
    }

    "" 
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
     
     setIsLoading(false)
  }




  // const initialValues = {
  //   {data ? {nombre:data.nombre,
  //       apellido:data.apellido,
  //       direccion:data.direccion,
  //       email: data.email,
  //       documento: data.documento,
  //       celular: data.celular,
  //       telefono: data.telefono,
  //       codigo: data.codigo} : data}
      
  // };
  

  const initialValues = 
 {
      nombre: data.nombre,
      apellido: data.apellido,
      direccion: data.direccion,
      email: data.email,
      documento: data.documento,
      celular: data.celular,
      telefono: data.telefono,
      codigo: data.codigo,
    }
  


  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo requerido").max(25,"Maximo 25 dígitos").min(5,"Mínimo 5 digitos"),
    apellido: Yup.string().required("Campo requerido").max(35,"Maximo 35 dígitos").min(5,"Mínimo 5 digitos"),
    direccion: Yup.string().required("Campo requerido").max(60,"Maximo 60 dígitos").min(20,"Mínimo 20 digitos"),
    email: Yup.string().email("email inválido").required("Campo requerido"),
    documento: Yup.string().required("Campo requerido").max(10,"Maximo 10 dígitos").min(7,"Mínimo 7 digitos"),
    celular: Yup.string().required("Campo requerido").max(10,"Maximo 10 dígitos").min(10,"Mínimo 10 digitos"),
    telefono: Yup.string().required("Campo requerido").max(7,"Maximo 7 dígitos").min(7,"Mínimo 7 digitos"),
    codigo: Yup.string().required("Campo requerido").max(10,"Maximo 10 dígitos").min(7,"Mínimo 6 digitos"),
  });


   if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={( {nombre, apellido, direccion, email, documento, celular, telefono, codigo } ) => {
          actualizarDatos(nombre, apellido, direccion, email, documento, celular, telefono, codigo)
          setTimeout(()=>{
              navigation("/")
          },1500)
          clearInterval(setTimeout)
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {(values) => {
          const { errors,isSubmitting, touched } = values;
          return (
            <Form>
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
                  <Flex
                    gap={"20px"}
                    direction={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    justifyContent={"space-between"}
                  >
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.nombre && touched.nombre}>
                        <label htmlFor="nombre">Nombre</label>
                        <Field
                          
                          as={Input}
                          mt={"10px"}
                          id="nombre"
                          name="nombre"
                          type="text"
                          w={["100%", "100%", "160px", "185px", "210px"]}
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                    
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.apellido && touched.apellido}>
                      <label  htmlFor="apellido">Apellido</label>
                      <Field
                         
                        as={Input}
                        mt={"10px"}
                        id="apellido"
                        name="apellido"
                        type="text"
                        w={["100%", "100%", "160px", "185px", "210px"]}
                      />
                      <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                      </FormControl>
                    
                  </Flex>
                  
                    <FormControl display={"flex"} flexDir={"column"} isInvalid={errors.direccion && touched.direccion}>
                    <label htmlFor="direccion">Dirección</label>
                    <Field
                        
                      as={Input}
                      mt={"10px"}
                      id="direccion"
                      name="direccion"
                      type="text"
                      w={"100%"}
                    />
                    <FormErrorMessage>{errors.direccion}</FormErrorMessage>
                    </FormControl>
                  
                  
                    <FormControl display={"flex"} flexDir={"column"} isInvalid={errors.email && touched.email} >
                    <label htmlFor="email">email Institucional</label>
                    <Field
                      
                      as={Input}
                      mt={"10px"}
                      id="email"
                      name="email"
                      type="text"
                      w={"100%"}
                      editable
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                  <Flex
                    gap={["20px", "20px"]}
                    direction={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    justifyContent={"space-between"}
                  >
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.documento && touched.documento}>
                      <label htmlFor="documento">Número de Documento</label>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="documento"
                        name="documento"
                        type="text"
                        w={["100%", "100%", "160px", "185px", "210px"]}
                      />
                      <FormErrorMessage>{errors.documento}</FormErrorMessage>
                      </FormControl>
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.celular && touched.celular}>
                      <label htmlFor="celular">Celular</label>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="celular"
                        name="celular"
                        type="text"
                        w={["100%", "100%", "160px", "185px", "210px"]}
                      />
                      <FormErrorMessage>{errors.celular}</FormErrorMessage>
                      </FormControl>
                   
                  </Flex>
                  <Flex
                    gap={["20px", "20px"]}
                    direction={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    justifyContent={"space-between"}
                  >
                   
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.telefono && touched.telefono}>
                      <label htmlFor="telefono">Teléfono</label>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="telefono"
                        name="telefono"
                        type="text"
                        w={["100%", "100%", "160px", "185px", "210px"]}

                      />
                      <FormErrorMessage>{errors.telefono}</FormErrorMessage>
                      </FormControl>
                  
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.codigo && touched.codigo}>
                      <label htmlFor="codigo">Código</label>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="codigo"
                        name="codigo"
                        type="text"
                        w={["100%", "100%", "160px", "185px", "210px"]}
                      />
                      <FormErrorMessage>{errors.codigo}</FormErrorMessage> 
                      </FormControl>
                    
                  </Flex>
                  <Flex
                    flexDirection={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    gap={["8px", "8px", "0"]}
                    justifyContent={"center"}
                  >
                    <Button
                      w={["100%", "100%", "160px", "185px", "210px"]}
                      type="submit"
                    >
                      Enviar
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
      
    </>
  );
}
