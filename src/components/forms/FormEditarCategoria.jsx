import { Box, Button, Select, Center, Textarea, Input } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { React, useContext, useEffect, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import * as Yup from "yup";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import Boton from "../pure/Boton";
import { toast, Toaster } from "react-hot-toast";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";

export default function FormularioEditarCategoria() {
  const [match, params] = useRoute("/editarCategoria/:id");
  const { token } = useContext(AppContext);
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [competencias, setCompetencias] = useState();
  const [compeSeleccionada, setCompeSeleccionada] = useState();
  const [location, setLocation] = useLocation();

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    competencia: Yup.string().required("La competencia es requerida, verifique si la perteneciente a esta categoria esta desactivada"),
    estado: Yup.string().required("El estado es requerido"),
    descripcion: Yup.string().required("La descripción es requerida"),
  });

  const obtenerCompetencias = async () => {
    let response = await axiosApi
      .get("/api/competencia", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error("Fallo al traer los las competencias");
      });
    setCompetencias(response.data);
    setLoading(false);
  };

  const actualizarCategoria = async (
    nombre,
    descripcion,
    competencia,
    estado,
    id
  ) => {
    let body = {
      nombre: nombre,
      descripcion: descripcion,
      estado: estado,
      competencia_id: competencia,
    };

    let response = await axiosApi
      .put(`/api/categoria/update/${id}`, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      })
      .finally(() => {
        setLocation("/categorias");
      });

    if (response.status === 200) {
      toast.success("¡Categoría actualizada correctamente!");
    }

    "" ;
  };



  const getCategoriaById = async (id) => {
    let response = await axiosApi
      .get(`/api/categoria/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    const categoria = response.data;
    const competenciaEncontrada = competencias.find(
      (comp) => comp.nombre === categoria.competencia.nombre
    );

    setDatos({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: categoria.estado.toString(),
      competencia: competenciaEncontrada ? competenciaEncontrada.id : null,
    });

    setLoading2(false);
  };

  useEffect(() => {
    obtenerCompetencias();
  }, []);

  useEffect(() => {
    if (competencias && competencias.length > 0) {
      getCategoriaById(params.id);
    }
  }, [competencias]);



  if (loading || loading2) {
    return <div>Cargando...</div>;
  }

  return (
    <Box>
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
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={({ nombre, descripcion, estado, competencia }) => {
              actualizarCategoria(
                nombre,
                descripcion,
                competencia,
                estado,
                params.id
              );
            }}
          >
            {(props) => {
              const { errors, touched, setFieldValue } = props;
              return (
                <Form>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <FormControl
                        id="nombre"
                        isInvalid={errors.nombre && touched.nombre}
                      >
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Field
                          as={Input}
                          mt="10px"
                          name="nombre"
                          type="text"
                          maxW={["200px", "300px", "350px", "400px"]}
                          w="400px"
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      mt="20px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      w={["200px", "300px", "350px", "400px"]}
                    >
                      <FormControl
                        id="competencia"
                        isInvalid={errors.competencia && touched.competencia}
                      >
                        <FormLabel htmlFor="competencia">Competencia</FormLabel>
                        <Field
                          as={Select}
                          id="competencia"
                          name="competencia"
                          maxW={["200px", "300px", "350px", "400px"]}
                          w="100%"
                          border="2px solid gray"
                          mt="10px"
                          onChange={(e) => {
                            setFieldValue("competencia", e.target.value);
                            setCompeSeleccionada(e.target.value);
                          }}
                        >
                          {competencias &&
                            competencias.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.nombre}
                              </option>
                            ))}
                        </Field>
                        <FormErrorMessage>
                          {errors.competencia}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      mt="20px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      w={["200px", "300px", "350px", "400px"]}
                    >
                      <FormControl
                        id="estado"
                        isInvalid={errors.estado && touched.estado}
                      >
                        <FormLabel htmlFor="estado">Estado</FormLabel>
                        <Field
                          as={Select}
                          name="estado"
                          maxW={["200px", "300px", "350px", "400px"]}
                          w="100%"
                          border="2px solid gray"
                          mt="10px"
                        >
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
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
                      <FormControl
                        id="descripcion"
                        isInvalid={errors.descripcion && touched.descripcion}
                      >
                        <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                        <Field
                          as={Textarea}
                          mt="10px"
                          name="descripcion"
                          resize="vertical"
                          h="100px"
                          maxW={["200px", "300px", "350px", "400px"]}
                          w="400px"
                        />
                        <FormErrorMessage>
                          {errors.descripcion}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Button
                      bgColor={"principal.100"}
                      _hover={{ backgroundColor: "fondo.100" }}
                      color={"white"}
                      w={["200px", "300px", "350px", "400px"]}
                      mt="30px"
                      type="submit"
                    >
                      Guardar
                    </Button>
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
