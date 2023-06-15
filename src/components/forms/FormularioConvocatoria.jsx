import {
  Box,
  Input,
  Textarea,
  Select,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field} from "formik";
import { useState, useRef, useContext, useEffect } from "react";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useLocation } from "wouter";

export default function FormularioConvocatoria() {
  const inputRef = useRef();
  const [loc, setLoc] = useLocation();
  const [pruebas, setPruebas] = useState();

  const { token } = useContext(AppContext);

 const obtenerPruebas = async () =>{
    let response = await axiosApi.get(`/api/prueba`,{
        headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error(e.response.data.error)
     })
     setPruebas(response.data)
    
  } 


  useEffect(()=>{
    obtenerPruebas()
  },[])


  const handleArchivoSeleccionado = (e, setFieldValue) => {
    setFieldValue("archivo", inputRef.current.files[0]);
  };

  const agregarConvocatoria = async (
    nombre,
    descripcion,
    fecha_inicio,
    fecha_fin,
    prueba_id,
    archivo
  ) => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("fecha_inicio", fecha_inicio);
    formData.append("fecha_fin", fecha_fin);
    formData.append("prueba_id", prueba_id);
    formData.append("archivo", archivo);

    let response = await axiosApi
      .post("/api/convocatoria/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      })
      .finally(() => {
        setLoc("/convocatorias");
      });

    if (response.status === 200) {
      toast.success("¡Convocatoria agregada correctamente!");
    }
    setLoc("/convocatorias")
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    descripcion: Yup.string().required("La descripción es requerida"),
    fecha_inicio: Yup.string().required("La fecha inicial es requerida"),
    fecha_fin: Yup.string().required("La fecha final es requerida"),
    prueba_id: Yup.string().required("La prueba es requerida"),
    archivo: Yup.mixed()
      .test("file-type", "El tipo de archivo es XLSX", (value) => {
        if (value) {
          return value.endsWith(".xlsx");
        }
        return true;
      })
      .required("El archivo es requerido"),
  });

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
            nombre: "",
            descripcion: "",
            fecha_inicio: "",
            fecha_fin: "",
            prueba_id: "",
            archivo: "",
          }}
          validationSchema={validationSchema}
          onSubmit={({nombre,descripcion,fecha_inicio,fecha_fin,prueba_id}) => {
            agregarConvocatoria(nombre,descripcion,fecha_inicio,fecha_fin,prueba_id,inputRef.current.files[0])
          }}
        >
          {(props) => {
            const { errors, setFieldValue, touched } = props;
            return (
              <Form>
                <Box
                  display="flex"
                  flexDirection={["column", "column", "row"]}
                  justifyContent="center"
                  flexDir={["column", "column", "row"]}
                  gap={"20px"}
                >
                  <Box w={"100%"}>
                    <FormLabel htmlFor="enunciado">Nombre</FormLabel>
                    <FormControl isInvalid={touched.nombre && errors.nombre}>
                      <Field
                        as={Input}
                        id="nombre"
                        name="nombre"
                        resize={"none"}
                      />
                      <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="prueba_id">Prueba</FormLabel>
                    <FormControl
                      isInvalid={touched.prueba_id && errors.prueba_id}
                    >
                      <Field
                        as={Select}
                        id="prueba_id"
                        name="prueba_id"
                        border="2px solid gray"
                      >
                        <option value={""}>Seleccione una prueba</option>
                        {pruebas &&
                          pruebas.map((prueba, index) => (
                            <option key={prueba.id} value={prueba.id}>
                              {prueba.nombre}
                            </option>
                          ))}
                      </Field>
                      <FormErrorMessage>{errors.prueba_id}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={["column", "column", "row"]}
                  mt={"20px"}
                  width={"100%"}
                  alignItems={"center"}
                >
                  <Box w={"100%"}>
                    <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                    <FormControl
                      isInvalid={touched.descripcion && errors.descripcion}
                    >
                      <Field
                        as={Input}
                        width={"100%"}
                        id="descripcion"
                        name="descripcion"
                      />
                      <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  mt="20px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Flex flexDir={["column", "column", "row"]} gap={"20px"}>
                    <FormControl
                      isInvalid={errors.fecha_inicio && touched.fecha_inicio}
                    >
                      <FormLabel htmlFor="fecha_inicio">
                        Fecha de inicio
                      </FormLabel>
                      <Field
                        id="fecha_inicio"
                        name="fecha_inicio"
                        as={Input}
                        type={"date"}
                        cursor="pointer"
                      />
                      <FormErrorMessage>{errors.fecha_inicio}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={errors.fecha_fin && touched.fecha_fin}
                    >
                      <FormLabel htmlFor="fecha_fin">Fecha final</FormLabel>
                      <Field
                        id="fecha_fin"
                        name="fecha_fin"
                        as={Input}
                        resize={"none"}
                        type={"date"}
                        cursor="pointer"
                      />
                      <FormErrorMessage>{errors.fecha_fin}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    mt={"20px"}
                    flexDir={["column", "column", "row"]}
                    gap={"20px"}
                  >
                    <FormControl isInvalid={errors.archivo && touched.archivo}>
                      <FormLabel htmlFor="archivo">Archivo</FormLabel>
                      <Field id="archivo" name="archivo">
                        {({ field }) => (
                          <Input
                            type="file"
                            ref={inputRef}
                            name="archivo"
                            variant="filled"
                            w={"100%"}
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
                  </Flex>
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
        
      </Box>
    </Box>
  );
}
