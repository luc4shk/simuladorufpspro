import {
  Box,
  Button,
  Select,
  Center,
  Textarea,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
  Image
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { React, useContext, useEffect, useRef, useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import * as Yup from "yup";
import Boton from "../pure/Boton";
import { toast } from "react-hot-toast";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { BiObjectsVerticalCenter } from "react-icons/bi";
import axios from "axios";

export default function FormEditarPregunta() {
  const [match, params] = useRoute("/editarPregunta/:id");
  const { token } = useContext(AppContext);
  const [imagen, setImagen] = useState()
  const [initialValues, setInitialValues] = useState();
  const [categorias, setCategorias] = useState();
  const inputRef = useRef()
  const [loc, setLoc] = useLocation()

  const cambiarImagen = () =>{
     const file = inputRef.current && inputRef.current.files[0];
      if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const obtenerCategorias = async () => {
    let response = await axiosApi
      .get("api/categoria/?estado=1", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
    setCategorias(response.data);
  };


  useEffect(()=>{
    cambiarImagen() 
  },[imagen])

  const actualizarPregunta = async (id,imagen,texto_pregunta,semestre,A,B,C,D,respuesta,categoria_id,estado) =>{
    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("texto_pregunta", texto_pregunta);
    formData.append("semestre", semestre);
    formData.append("A", A);
    formData.append("B", B);
    formData.append("C", C);
    formData.append("D", D);
    formData.append("respuesta", respuesta);
    formData.append("estado", estado);
    formData.append("categoria_id", categoria_id);
    let response = await axiosApi.put(`/api/question/update/${id}`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }).catch((e) => {
      toast.error(e.response.data.error);
    }).finally(()=>{
      setLoc("/preguntas");
    });

    if(response.status === 200){
      toast.success("¡Pregunta actualizada correctamente!")
    }
  }

  const obtenerPreguntaPorId = async (id) => {
    let response = await axiosApi
      .get(`/api/question/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    const categoriaEncontrada = categorias && categorias.find(
      (categoria) => categoria.nombre === response.data.categoria
    );

    setInitialValues({
      enunciado: response.data.enunciado,
      semestre: response.data.semestre,
      estado: response.data.estado.toString(),
      categoria: categoriaEncontrada ? categoriaEncontrada.id : null,
      // imagen: response.data.imageFile ? response.data.imageFile : null,
      imagen:"",
      opcionA: response.data.opciones[0],
      opcionB: response.data.opciones[1],
      opcionC: response.data.opciones[2],
      opcionD: response.data.opciones[3],
      respuesta: response.data.respuesta,
    });

    setImagen(response.data.imageFile)
    
  };

  const validationSchema = Yup.object().shape({
    enunciado: Yup.string().required("El enunciado es requerido"),
    semestre: Yup.string().required("El semestre es requerido"),
    estado: Yup.string().required("El estado es requerido"),
    categoria: Yup.string().nullable(),
    imagen: Yup.string().nullable(),
    opcionA: Yup.string().required("La opción A es requerida"),
    opcionB: Yup.string().required("La opción B es requerida"),
    opcionC: Yup.string().required("La opción C es requerida"),
    opcionD: Yup.string().required("La opción D es requerida"),
    respuesta: Yup.string()
    .required("La respuesta es requerida")
    .test("opcion-valid", "La respuesta debe estar dentro de las opciones escogidas", function (value) {
      return value.toString() === this.resolve(Yup.ref("opcionA")) || value.toString() === this.resolve(Yup.ref("opcionB")) || value.toString() === this.resolve(Yup.ref("opcionC")) || value.toString() === this.resolve(Yup.ref("opcionD"));
    }),
  });

  useEffect(() => {
    obtenerCategorias();
    
  }, []);

    useEffect(() => {
    if (categorias && categorias.length > 0) {
      obtenerPreguntaPorId(params.id);
    }
  }, [categorias]);

   if (!initialValues) {
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({enunciado, semestre,respuesta,estado,categoria,opcionA,opcionB,opcionC,opcionD})=>{
              actualizarPregunta(params.id,inputRef.current.files[0],enunciado,semestre,opcionA,opcionB,opcionC,opcionD,respuesta,categoria,estado)
            }}
          >
            {(props) => {
              const { errors, touched, setFieldValue } = props;
              return (
                  <Form>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <FormLabel htmlFor="enunciado">Enunciado</FormLabel>
                      <FormControl
                        isInvalid={touched.enunciado && errors.enunciado}
                      >
                        <Field
                          as={Textarea}
                          mt="10px"
                          id="enunciado"
                          name="enunciado"
                          resize={"none"}
                        />
                        <FormErrorMessage>{errors.enunciado}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={["column","column","row"]}
                      mt={"30px"}
                      width={"100%"}
                      alignItems={"center"}
                      gap={"20px"}
                    >
                    <Box w={"100%"}>
                      <FormLabel>Imagen</FormLabel>
                      <Field
                      id="imagen"
                      name="imagen"
                      mt="10px"
                      mr={{ base: "0", sm: "5" }}
                      mb={{ base: "2", sm: "0" }}
                    >
                      {({ field }) => (
                        <FormControl
                          isInvalid={touched.imagen && errors.imagen}
                        >
                          <Input
                            type="file"
                            accept=".png, .jpeg"
                            name="imagen"
                            ref={inputRef}
                            variant="unstyled"
                            onChange={(event) => {
                              cambiarImagen();
                            }}
                            {...field}
                          />
                          <FormErrorMessage>{errors.imagen}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    </Box>
                    <Box w={"100%"}>
                    <FormLabel htmlFor="semestre">Semestre</FormLabel>
                      <FormControl
                        isInvalid={touched.semestre && errors.semestre}
                      >
                        <Field
                          as={Input}
                          mt="10px"
                          id="semestre"
                          name="semestre"
                        />
                        <FormErrorMessage>{errors.semestre}</FormErrorMessage>
                      </FormControl>
                      </Box>
                    </Box>
                    <Box
                      mt="10px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      w="100%"
                    >
                      <FormLabel htmlFor="categoria">Categoría</FormLabel>
                      <FormControl
                        isInvalid={touched.categoria && errors.categoria}
                      >
                        <Field
                          as={Select}
                          id="categoria"
                          name="categoria"
                          border="2px solid gray"
                          mt="10px"
                        >
                          {categorias && categorias.map((categoria, index) => (
                            <option key={categoria.id} value={categoria.id}>
                              {categoria.nombre}
                            </option>
                          ))}
                        </Field>
                        <FormErrorMessage>{errors.categoria}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      mt="10px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      w="100%"
                    >
                      <FormLabel htmlFor="estado">Estado</FormLabel>
                      <FormControl
                        isInvalid={touched.estado && errors.estado}
                      >
                        <Field
                          as={Select}
                          id="estado"
                          name="estado"
                          border="2px solid gray"
                          mt="10px"
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
                </Box>
                <Box
                  mt="10px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Flex flexDir={["column","column","row"]} gap={"20px"}>
                    <FormControl isInvalid={errors.opcionA && touched.opcionA}>
                      <FormLabel htmlFor="opcionA">Opción A</FormLabel>
                      <Field id="opcionA" name="opcionA" as={Textarea} resize={"none"} />
                      <FormErrorMessage>{errors.opcionA}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.opcionB && touched.opcionB}>
                      <FormLabel htmlFor="opcionB">Opción B</FormLabel>
                      <Field id="opcionB" name="opcionB" as={Textarea}  resize={"none"}/>
                      <FormErrorMessage>{errors.opcionB}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex flexDir={["column","column","row"]} gap={"20px"}>
                    <FormControl isInvalid={errors.opcionC && touched.opcionC}>
                      <FormLabel htmlFor="opcionC">Opción C</FormLabel>
                      <Field id="opcionC" name="opcionC" as={Textarea}  resize={"none"}/>
                      <FormErrorMessage>{errors.opcionC}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.opcionD && touched.opcionD}>
                      <FormLabel htmlFor="opcionD">Opción D</FormLabel>
                      <Field id="opcionD" name="opcionD" as={Textarea}  resize={"none"}/>
                      <FormErrorMessage>{errors.opcionD}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <FormControl
                    isInvalid={errors.respuesta && touched.respuesta}
                  >
                    <FormLabel htmlFor="respuesta">Respuesta</FormLabel>
                    <Field id="respuesta" name="respuesta" as={Input} />
                    <FormErrorMessage>{errors.respuesta}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit" 
                    mt="30px"
                    w={"100%"}
                    bgColor={"principal.100"}
                    textColor={"white"}
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
