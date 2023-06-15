import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Select,
  Center,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useRoute } from "wouter";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import { toast, Toaster } from "react-hot-toast";

export default function FormularioEditarCompetencia() {
  const [match, params] = useRoute('/editarCompetencia/:id');
  const { token } = useContext(AppContext);
  const [datos, setDatos] = useState();
  const [loading, setLoading] = useState(true);
  const [loc, setLoc] = useLocation();

  const actualizarCompetencia = async (nombre, descripcion, estado, id) => {
    let body = {
      nombre: nombre,
      descripcion: descripcion,
      estado: estado
    };

    let response = await axiosApi.put(`api/competencia/update/${id}`, body, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).catch((e) => {
      toast.error(e.response.data.error);
    }).finally(()=>{
    setLoc("/competencias");
    });

    if (response.status === 200) {
      toast.success("¡Competencia actualizada!");
    }
    if(body.estado===false){
      toast("¡Todas las categorías asociadas a esta competencia se desactivaran!", {
      icon: '⚠️',
      });
    }
  };

  const obtenerCompetenciaPorId = async (id) => {
    let response = await axiosApi.get(`api/competencia/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).catch((e) => {
      toast.error("Error al traer los datos de la competencia");
    });

    setDatos({
      nombre: response.data.nombre,
      estado: response.data.estado.toString(),
      descripcion: response.data.descripcion
    });

    setLoading(false);
  };

  useEffect(() => {
    obtenerCompetenciaPorId(params.id);
  }, []);

  const estados = ["Activo", "Inactivo"];

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido").max(25, "Máximo 25 caracteres").min(5, "Mínimo 5 caracteres"),
    estado: Yup.string().required("El estado es requerido"),
    descripcion: Yup.string().required("La descripción es requerida").max(200, "Máximo 200 caracteres").min(10, "Mínimo 10 caracteres")
  });



  if (loading) {
    return <div>Cargando...</div>;
  }

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
            initialValues={datos}
            validationSchema={validationSchema}
            onSubmit={({ nombre, descripcion, estado }, { setFieldValue }) => {
              const estadoValue = estado === "true";
              actualizarCompetencia(nombre, descripcion, estadoValue, params.id);
              setFieldValue("estado", estadoValue);
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
                  >
                    <Box>
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.nombre && touched.nombre}>
                        <label htmlFor="nombre">Nombre</label>
                        <Field
                          name="nombre"
                          as={Input}
                          mt="10px"
                          id="nombre"
                          type="text"
                          maxW={["200px", "300px", "350px", "400px"]}
                          w="400px"
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      mt="20px"
                      w={["200px", "300px", "350px", "400px"]}
                    >
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.estado && touched.estado}>
                        <Field
                          name="estado"
                          as={Select}
                          mt="10px"
                          id="estado"
                          type="text"
                          maxW={["200px", "300px", "350px", "400px"]}
                          w="400px"
                        >
                          <option value={"true"}>Activo</option>
                          <option value={"false"}>Inactivo</option>
                        </Field>
                        <FormErrorMessage>{errors.estado}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      mt="10px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.descripcion && touched.descripcion}>
                        <label htmlFor="descripcion">Descripción</label>
                        <Field
                          name="descripcion"
                          as={Textarea}
                          mt="10px"
                          id="descripcion"
                          type="text"
                          maxW={["200px", "300px", "350px", "400px"]}
                          w="400px"
                          h={"150px"}
                        />
                        <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Button
                      w={["200px", "300px", "350px", "400px"]}
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
