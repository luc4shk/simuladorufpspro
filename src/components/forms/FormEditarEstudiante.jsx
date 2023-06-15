import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Select,
  Center,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
  FormLabel
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useRoute } from "wouter";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import { toast, Toaster } from "react-hot-toast";

export default function FormEditarEstudiante() {
  const [match,params] = useRoute('/editarEstudiante/:id');
  const { token } = useContext(AppContext);
  const [datos, setDatos] = useState();
  const [loading, setLoading] = useState(true);
  const [loc, setLoc] = useLocation();

  const actualizarEstudiante = async (nombre, apellido,codigo,email,semestre, estado, id) => {
    let body = {
      nombre: nombre,
      apellido: apellido,
      codigo: codigo,
      email:email,
      semestre:semestre,
      estado:estado
    };

    let response = await axiosApi.put(`api/user/student/updateDir/${id}`, body, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).catch((e) => {
      toast.error(e.response.data.error);
    }).finally(()=>{
    setLoc("/estudiantes");
    });

    if (response.status === 200) {
      toast.success("¡Estudiante actualizado!");
    }
    // if(body.estado===false){
    //   toast("¡Todas las categorías asociadas a esta competencia se desactivaran!", {
    //   icon: '⚠️',
    //   });
    // }
  };

  const getEstudianteById = async (id) =>{
    let response = await axiosApi.get(`/api/user/student/${id}`,{
    headers: {
        Authorization: "Bearer " + token
      }
    }).catch((e) => {
      toast.error(e.response.data.error);
    });

    setDatos({
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        codigo: response.data.codigo,
        email: response.data.email,
        semestre: response.data.semestre,
        estado:response.data.estado.toString()
    })
    setLoading(false)


  }



  useEffect(() => {
    getEstudianteById(params.id)
  }, []);


  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido").max(25, "Máximo 25 caracteres").min(5, "Mínimo 5 caracteres"),
    apellido: Yup.string().required("El nombre es requerido").max(25, "Máximo 25 caracteres").min(5, "Mínimo 5 caracteres"),
    semestre: Yup.string().required("El nombre es requerido").max(2, "Máximo 2 dígitos").min(1, "Mínimo 1 dígido"),
    email: Yup.string().email().required("El email es requerido"),
    estado: Yup.string().required("El estado es requerido"),
    codigo: Yup.string().required("El estado es requerido").max(7, "Máximo 7 caracters").min(7, "Mínimo 7 caracteres"),
  });


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Box>
      <Center h="100%">
        <Box
          p="20px"
          borderRadius="8px"
          bgColor="white"
          overflow="hidden"
        >
          <Formik
            initialValues={datos}
            validationSchema={validationSchema}
            onSubmit={({ nombre, apellido, codigo, email, semestre, estado }, { setFieldValue }) => {
              const estadoValue = estado === "true";
            //   actualizarCompetencia(nombre,c);
            //   setFieldValue("estado", estadoValue);
              actualizarEstudiante(nombre,apellido,codigo,email,semestre,estadoValue,params.id)
            }}
          >
            {(props) => {
              const { errors, touched } = props;
              return (
                <Form>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    gap={"20px"}
                  >
                    <Box
                        display={"flex"}
                        flexDir={["column","column","row"]}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={"15px"}
                    >
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.nombre && touched.nombre}>
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Field
                          name="nombre"
                          as={Input}
                          id="nombre"
                          type="text"
                          maxW={["200px", "250px", "200px", "200px"]}
                          w="400px"
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.apellido && touched.apellido}>
                        <FormLabel htmlFor="apellido">Apellido</FormLabel>
                        <Field
                          name="apellido"
                          as={Input}
                          id="apellido"
                          type="text"
                          maxW={["200px", "250px", "200px", "200px"]}
                          w="400px"
                        />
                        <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      display={"flex"}
                        flexDir={["column","column","row"]}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={"15px"}
                    >
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.estado && touched.estado}>
                        <FormLabel htmlFor="estado">Estado</FormLabel>
                        <Field
                          name="estado"
                          as={Select}
                          id="estado"
                          type="text"
                          maxW={["200px", "250px", "200px", "200px"]}
                          w="400px"
                        >
                          <option value={"true"}>Activo</option>
                          <option value={"false"}>Inactivo</option>
                        </Field>
                        <FormErrorMessage>{errors.estado}</FormErrorMessage>
                      </FormControl>
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.codigo && touched.codigo}>
                        <FormLabel htmlFor="codigo">Código</FormLabel>
                        <Field
                          name="codigo"
                          as={Input}
                          id="codigo"
                          type="text"
                          maxW={["200px", "250px", "200px", "200px"]}
                        />
                        <FormErrorMessage>{errors.codigo}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      mt="10px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.email && touched.email}>
                        <FormLabel htmlFor="email">Correo</FormLabel>
                        <Field
                          name="email"
                          as={Input}
                          id="email"
                          type="text"
                          maxW={["200px", "250px", "415px", "415px"]}
                          w="415px"
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    </Box>

                    <Button
                      w={["200px", "250px", "415px", "415px"]}
                      mt={"30px"}
                      type="submit"
                      bgColor={"principal.100"}
                      _hover={{ backgroundColor: "fondo.100" }}
                      color={"white"}
                    >Guardar</Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Center>
    </Box>
  );
}
