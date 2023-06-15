import {
  Box,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  Button,
  Flex,
  Text,
  color,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Boton from "../pure/Boton";
import { useState, useRef, useContext, useEffect } from "react";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import useLocation from "wouter/use-location";
const categorias = ["Inglés", "Español", "Análisis", "Matemáticas"];

export default function FormularioSimple() {
  const [archivo, setArchivo] = useState(null);
  const archivoInputRef = useRef(null);
  const inputRef = useRef();
  const ARef = useRef();
  const BRef = useRef();
  const CRef = useRef();
  const DRef = useRef();
  const [loc, setLoc] = useLocation()
  const [categorias, setCategorias] = useState()

  const { token } = useContext(AppContext);

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

  const procesarArchivo = async (file) => {
    const formData = new FormData();
    formData.append("archivo", file);
    let response = await axiosApi
      .post("/api/question/createQuestionFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    if (response.status === 200) {
      toast.success("¡Archivo cargado correctamente!");
    }
  };

  const handleArchivoSeleccionado = (e, setFieldValue) => {
    setFieldValue("archivo", inputRef.current.files[0]);
  };

  const agregarPregunta = async (texto_pregunta, semestre, A, B, C, D, respuesta, categoria_id) => {
    let body = {
      texto_pregunta: texto_pregunta,
      semestre: semestre,
      A: A,
      B: B,
      C: C,
      D: D,
      respuesta: respuesta,
      categoria_id: categoria_id,
    };
    let response = await axiosApi.post("/api/question/createQuestion",body,{
      headers: {
        Authorization: "Bearer " + token,
      },
    }).catch((e) => {
      toast.error(e.response.data.error);
    }).finally(()=>{
      setLoc("/preguntas");
    });

    if (response.status === 200) {
      toast.success("¡Pregunta agregada correctamente!");
    };
  };

  const validationSchema = Yup.object().shape({
    enunciado: Yup.string().required("El enunciado es requerido"),
    opcionA: Yup.string().required("La opción A es requerida"),
    opcionB: Yup.string().required("La opción B es requerida"),
    opcionC: Yup.string().required("La opción C es requerida"),
    opcionD: Yup.string().required("La opción D es requerida"),
    respuesta: Yup.string()
    .required("La respuesta es requerida")
    .test("opcion-valid", "La respuesta debe estar dentro de las opciones escogidas", function (value) {
      return value.toString() === this.resolve(Yup.ref("opcionA")) || value.toString() === this.resolve(Yup.ref("opcionB")) || value.toString() === this.resolve(Yup.ref("opcionC")) || value.toString() === this.resolve(Yup.ref("opcionD"));
    }),
    semestre: Yup.string().required("El semestre es requerido"),
    categoria: Yup.string().required("La categoría es requerida"),
  });

  const initialValues2 = {
    archivo: null,
  };

  const validationSchema2 = Yup.object().shape({
    archivo: Yup.mixed()
      .test("file-type", "El tipo de archivo es XLSX", (value) => {
        if (value) {
          return value.endsWith(".xlsx");
        }
        return true;
      })
      .required("El archivo es requerido"),
  });

  useEffect(()=>{
    obtenerCategorias()
  })

  return (
    <Box>
      <Box
        bg="white"
        p="40px"
        borderRadius="8px"
        w={{
          base: "270px",
          sm: "390px",
          md: "540px",
          lg: "640px",
          tableBreakpoint: "800px",
        }}
        overflow="hidden"
      >
        <Formik
          initialValues={{
            enunciado: "",
            opcionA: "",
            opcionB: "",
            opcionC: "",
            opcionD: "",
            respuesta: "",
            semestre: "",
            categoria: "",
          }}
          validationSchema={validationSchema}
          onSubmit={({enunciado,opcionA,opcionB,opcionC,opcionD,respuesta,semestre,categoria}) => {
            agregarPregunta(enunciado,semestre,opcionA,opcionB,opcionC,opcionD,respuesta,categoria)
          }}
        >
          {(props) => {
            const { errors, setFieldValue, touched } = props;
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
                  flexDirection={["column", "column", "row"]}
                  mt={"30px"}
                  width={"100%"}
                  alignItems={"center"}
                  gap={"20px"}
                >
                  <Box w={"100%"}>
                    <FormLabel htmlFor="semestre">Semestre</FormLabel>
                    <FormControl
                      isInvalid={touched.semestre && errors.semestre}
                    >
                      <Field as={Input} id="semestre" name="semestre" />
                      <FormErrorMessage>{errors.semestre}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="categoria">Categoría</FormLabel>
                    <FormControl
                      isInvalid={touched.categoria && errors.categoria}
                    >
                      <Field
                        as={Select}
                        id="categoria"
                        name="categoria"
                        border="2px solid gray"
                      >
                        <option>Seleccione una categoria</option>
                        {categorias &&
                          categorias.map((categoria, index) => (
                            <option key={categoria.id} value={categoria.id}>
                              {categoria.nombre}
                            </option>
                          ))}
                      </Field>
                      <FormErrorMessage>{errors.categoria}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  mt="10px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Flex flexDir={["column", "column", "row"]} gap={"20px"}>
                    <FormControl isInvalid={errors.opcionA && touched.opcionA}>
                      <FormLabel htmlFor="opcionA">Opción A</FormLabel>
                      <Field
                        id="opcionA"
                        name="opcionA"
                        as={Textarea}
                        resize={"none"}
                      />
                      <FormErrorMessage>{errors.opcionA}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.opcionB && touched.opcionB}>
                      <FormLabel htmlFor="opcionB">Opción B</FormLabel>
                      <Field
                        id="opcionB"
                        name="opcionB"
                        as={Textarea}
                        resize={"none"}
                      />
                      <FormErrorMessage>{errors.opcionB}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex flexDir={["column", "column", "row"]} gap={"20px"}>
                    <FormControl isInvalid={errors.opcionC && touched.opcionC}>
                      <FormLabel htmlFor="opcionC">Opción C</FormLabel>
                      <Field
                        id="opcionC"
                        name="opcionC"
                        as={Textarea}
                        resize={"none"}
                      />
                      <FormErrorMessage>{errors.opcionC}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.opcionD && touched.opcionD}>
                      <FormLabel htmlFor="opcionD">Opción D</FormLabel>
                      <Field
                        id="opcionD"
                        name="opcionD"
                        as={Textarea}
                        resize={"none"}
                      />
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

                <Button
                  w={"100%"}
                  bgColor={"principal.100"}
                  textColor={"white"}
                  mt={"30px"}
                  type="sumbit"
                  _hover={{ backgroundColor: "fondo.100" }}
                >
                  Guardar
                </Button>
              </Form>
            );
          }}
        </Formik>
        <Formik
          initialValues={initialValues2}
          validationSchema={validationSchema2}
          onSubmit={() => {
            procesarArchivo(inputRef.current.files[0]);
          }}
        >
          {(props) => {
            const { errors, touched, setFieldValue } = props;
            return (
              <Form>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify={"space-between"}
                >
                  <FormControl isInvalid={errors.archivo && touched.archivo}>
                    <Field id="archivo" name="archivo">
                      {({ field }) => (
                        <Input
                          type="file"
                          ref={inputRef}
                          name="archivo"
                          variant="filled"
                          mb="10px"
                          mt="10px"
                          w={{
                            sm: "100%",
                            md: "200px",
                            lg: "250px",
                            tableBreakpoint: "340px",
                          }}
                          cursor={"pointer"}
                          onChange={(event) => {
                            handleArchivoSeleccionado(event, setFieldValue);
                          }}
                          {...field}
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.archivo}</FormErrorMessage>
                  </FormControl>
                  <Button
                    bgColor="principal.100"
                    textColor="white"
                    w={{
                      sm: "100%",
                      md: "200px",
                      lg: "250px",
                      tableBreakpoint: "340px",
                    }}
                    _hover={{ backgroundColor: "fondo.100" }}
                    mb="10px"
                    mt="10px"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
}
