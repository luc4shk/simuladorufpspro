import { Box, Button, Center, Input, Textarea, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import {React, useContext} from "react";
import { useLocation } from "wouter";
import Boton from "../pure/Boton";
import * as Yup from "yup"
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast, Toaster } from "react-hot-toast";
export default function FormularioCompetencia() {

  
  const {token,user} = useContext(AppContext)
  const [loc, setLoc] = useLocation()
  const AgregarCompetencia = async (nombre, descripcion) =>{
    let body={
      nombre:nombre,
      descripcion:descripcion
    }
    let response = await axiosApi.post("api/competencia/create",body,{
      headers:{
      "Content-Type": "application/json",
       Authorization:"Bearer " + token
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    }).finally(
      ()=>{
        setLoc("/competencias")
      }
    )

    if(response.status === 200){
      toast.success("¡Competencia Creada!")
    }
    
  }

    const initialValues = {
      nombre: "",
      descripcion: "",
    }

    const validationSchema= Yup.object().shape(
      {
         nombre: Yup.string().required("El nombre es requerido").min(5,"Minimo 5 caracteres").max(25,"Maximo 25 caracteres"),
        descripcion: Yup.string().required("La descripción es requerida").min(10,"Minimo 10 caracteres").max(200,"Máximo 200 caracteres"),
      }
    )

  return (
    <Box position="fixed">
      <Center h="100%">
        <Box
          p="40px"
          borderRadius="8px"
          bgColor="white"
          minW={["150px", "250px", "480px", "550px"]}
          overflow="hidden"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({nombre, descripcion}) => {
              AgregarCompetencia(nombre, descripcion)
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                >
                  <Box display="flex" flexDirection="column" justifyContent="center">
                    <label htmlFor="nombre">Nombre</label>
                    <FormControl isInvalid={errors.nombre && touched.nombre}>
                      <Field
                        as={Input}
                        mt="10px"
                        id="nombre"
                        name="nombre"
                        type="text"
                        maxW={["200px", "300px", "350px", "400px"]}
                        w="400px"
                      />
                      <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box
                    mt="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <label htmlFor="descripcion">Descripción</label>
                    <FormControl isInvalid={errors.descripcion && touched.descripcion}>
                      <Field
                        as={Textarea}
                        mt="10px"
                        id="descripcion"
                        name="descripcion"
                        resize="none"
                        h="180px"
                        maxW={["200px", "300px", "350px", "400px"]}
                        w="400px"
                      />
                      <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Button
                   bgColor={"principal.100"}
                      _hover={{backgroundColor:"fondo.100"}}
                      color={"white"}
                    w={["200px", "300px", "350px", "400px"]}
                    mt={"30px"}
                    type="submit"
                  >Guardar</Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Center>
      
    </Box>
  );
}
 