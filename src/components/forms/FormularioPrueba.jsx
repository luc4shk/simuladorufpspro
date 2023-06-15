import {
  Box,
  FormControl,
  Button,
  FormErrorMessage,
  Input,
  MenuOptionGroup,
  Menu,
  Select,
  MenuButton,
  MenuList,
  MenuItem,
  FormLabel,
  Stack,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { AppContext } from "../context/AppProvider";
import useLocation from "wouter";
import React, { useContext, useEffect, useState, useRef } from "react";
import axiosApi from "../../utils/config/axios.config";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { m } from "framer-motion";
export default function FormularioPrueba() {
  const { token } = useContext(AppContext);
  const [location, setLocation] = useLocation();
  const [competencias, setCompetencias] = useState([]);
  const [categorias, setCategorias] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [contador, setContador] = useState([]);
  const [mapRef, useMapRef] = useState([]);
  const [inputFields, setInputFields] = useState([
    { id: "", numeroPreguntas: "", valor: "" },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const obtenerCompetencias = async (id) => {
    let response = await axiosApi
      .get("/api/competencia/?estado=1", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error("Fallo al traer los las competencias");
      });
    const categoriasConCompetencias = response.data.filter(
      (item) => item.categorias.length !== 0
    );
    setCompetencias(categoriasConCompetencias);

    // setCompetencias(response.data);
    setLoading(false);
  };

  const obtenerCategoriasPorCompetencia = async (id) => {
    let response = await axiosApi
      .get(`/api/competencia/${id}/categorias`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    setSeleccionadas((seleccionadas) => [...seleccionadas, response.data]);
    setCategorias(response.data);
  };

  useEffect(() => {
     {toast("Este apartado no se encuentra funcional actualmente, tiene la libertad de probar el formulario, en su defecto contamos con pruebas ya creadas, gracias.", {
      icon: '⚠️',
      });}

    obtenerCompetencias();
  },[]);

  const initialValues = {
    nombre: "",
    descripcion: "",
    semestre: "",
    duracion: "",
    competencias: false,
    totalPreguntas: "",
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre requerido"),
    descripcion: Yup.string().required("Descripción requerida"),
    semestre: Yup.number().required("Semestre requerido"),
    duracion: Yup.number().required("Duración requerida"),
    competencias: Yup.bool().oneOf(
      [true],
      "You need to accept the terms and conditions"
    ),
    totalPreguntas: Yup.string().required(
      "El número total de preguntas es requerida"
    ),
  });

 
  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <Box
      bgColor={"white"}
      w={{
        base: "270px",
        sm: "390px",
        md: "540px",
        lg: "640px",
        tableBreakpoint: "800px",
      }}
      p={"40px"}
      borderRadius={"8px"}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {(props) => {
          const { errors, touched, isSubmitting } = props;
          return (
            <form>
              <Flex gap={"20px"} flexDir={["column", "column", "row"]}>
                <FormControl
                  isInvalid={errors.nombre && touched.nombre}
                  display={"flex"}
                  flexDir={"column"}
                  gap={"10px"}
                >
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <Field
                    w={"100%"}
                    name="nombre"
                    id="nombre"
                    type="text"
                    as={Input}
                  />
                  <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.descripcion && touched.descripcion}
                  display={"flex"}
                  flexDir={"column"}
                  gap={"10px"}
                >
                  <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                  <Field
                    w={"100%"}
                    name="descripcion"
                    id="descripcion"
                    type="text"
                    as={Input}
                  />
                  <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex
                mt={"20px"}
                gap={"20px"}
                flexDir={["column", "column", "row"]}
              >
                <FormControl
                  isInvalid={errors.semestre && touched.semestre}
                  display={"flex"}
                  flexDir={"column"}
                  gap={"10px"}
                >
                  <FormLabel htmlFor="">Semestre</FormLabel>
                  <Field
                    w={"100%"}
                    name="semestre"
                    id="semestre"
                    type="text"
                    as={Input}
                  />
                  <FormErrorMessage>{errors.semestre}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.duracion && touched.duracion}
                  display={"flex"}
                  flexDir={"column"}
                  gap={"10px"}
                >
                  <FormLabel htmlFor="">Duración de la prueba</FormLabel>
                  <Field
                    w={"100%"}
                    name="duracion"
                    id="duracion"
                    type="text"
                    as={Input}
                  />
                  <FormErrorMessage>{errors.duracion}</FormErrorMessage>
                </FormControl>
              </Flex>
              <FormControl
                isInvalid={errors.totalPreguntas && touched.totalPreguntas}
                display={"flex"}
                flexDir={"column"}
                gap={"10px"}
                mt={"20px"}
              >
                <FormLabel htmlFor="">Número de preguntas</FormLabel>
                <Field
                  w={"100%"}
                  name="totalPreguntas"
                  id="totalPreguntas"
                  type="text"
                  as={Input}
                />
                <FormErrorMessage>{errors.totalPreguntas}</FormErrorMessage>
              </FormControl>

              <FormControl
                display={"flex"}
                flexDir={"column"}
                gap={"10px"}
                mt={"20px"}
                isInvalid={errors.competencias && touched.competencias}
              >
                <FormLabel htmlFor="">Competencias</FormLabel>
                <Field
                  w={"100%"}
                  as={Stack}
                  name="competencias"
                  id="competencias"
                  spacing={5}
                  direction="row"
                >
                  {competencias &&
                    competencias.map((compe, index) => (
                      <Checkbox
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            obtenerCategoriasPorCompetencia(compe.id);
                          } else {
                            setSeleccionadas(
                              seleccionadas.filter(
                                (item) => item.nombre !== compe.nombre
                              )
                            );
                          }
                          setLoading2(false);
                        }}
                        key={index}
                        colorScheme="cyan"
                        value={compe.id}
                      >
                        {compe.nombre}
                      </Checkbox>
                    ))}
                </Field>

                <FormErrorMessage>{errors.competencias}</FormErrorMessage>
              </FormControl>
              {seleccionadas &&
              
                seleccionadas.map((categoria, index) =>{


                  return(
                  categoria.categorias.map((item, subIndex) => {
                     
                       
                    
                    return (
                      <Flex
                        mt={"20px"}
                        gap={"20px"}
                        flexDir={["column", "column", "row"]}
                      >
                        <h2>
                          {item.nombre} {item.id}
                        </h2>
                        <Input
                          id="numeroPreguntas"
                          name="numeroPreguntas"
                          onChange={(e) => {
                            handleFormChange(index, e);
                          }}
                        ></Input>
                        <Input
                          id="valor"
                          name="valor"
                          onChange={(e) => {
                            handleFormChange(index, e);
                          }}
                        ></Input>
                      </Flex>
                    );
                  })
  )})}

              <Button
                bgColor={"principal.100"}
                onSubmit={() => alert("aa")}
                color={"white"}
                _hover={"none"}
                _active={"none"}
                w={"100%"}
                mt={"20px"}
              >
                Enviar
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
}


