import React, { useState , useContext, useEffect} from 'react'
import { useLocation, useRoute } from 'wouter';
import { AppContext } from "../context/AppProvider";
import { Box, FormLabel, FormErrorMessage, FormControl, Button, Input, Select, useSafeLayoutEffect } from '@chakra-ui/react';
import * as Yup from "yup"
import {Formik, Form, Field} from "formik"
import axiosApi from '../../utils/config/axios.config';
import { toast } from 'react-hot-toast';
export default function FormEditarConvocatoria() {
  const [match, params] = useRoute('/editarConvocatoria/:id');
  const [datos, setDatos] = useState()
  const [loading, setLoading] = useState(true)
  const [loc, setLoc] = useLocation()
  const [pruebas, setPruebas] = useState(true)
  const { token } = useContext(AppContext);
  const initialValues = {
    nombre:"",
    prueba_id:"",
    descripcion:"",
    fecha_inicio:"",
    fecha_fin:""
  }

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
    getConvocatoriaById(params.id)
  },[]) 

  const actualizarConvocatoria = async (nombre, prueba_id, descripcion, fecha_inicio, fecha_fin, id) =>{
    let body={
        nombre:nombre,
        prueba_id:prueba_id,
        descripcion:descripcion,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin
    }

    let response = await axiosApi.put(`api/convocatoria/update/${id}`,body,{
         headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error(e.response.data.error)
    }).finally(
        setLoc("/convocatorias")
    )

    if(response.status === 200){
        toast.success("¡La convocatoria se actualizón correctamente!")
    }

    console.log(response)
  }

  const getConvocatoriaById = async (id) =>{
    let response = await axiosApi.get(`/api/convocatoria/${id}`,{
         headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error("Error al traer las convocatorias")
    })
     const convocatoria = response.data;
    const fechaIni = convocatoria.fecha_inicio
      ? convocatoria.fecha_inicio.toString().replace("T00:00:00.000Z", "")
      : "";
    const fechaFin = convocatoria.fecha_fin
      ? convocatoria.fecha_fin.toString().replace("T00:00:00.000Z", "")
      : "";
    console.log(fechaIni)
    setDatos({
         nombre: convocatoria.nombre || "",
      prueba_id: convocatoria.prueba_id || "",
      descripcion: convocatoria.descripcion || "",
      fecha_inicio: fechaIni ? fechaIni : null,
      fecha_fin: fechaFin ? fechaFin : null,
    })
    setLoading(false)
    console.log(datos)
  }

 

  const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  fecha_inicio: Yup.string().required("La fecha inicial es requerida"),
  fecha_fin: Yup.string().required("La fecha final es requerida"),
  prueba_id: Yup.string().required("La prueba es requerida")
});

if(loading){
    return <div>Cargando...</div>
}
  return (
        <Box
          p="20px"
          borderRadius="8px"
          bgColor="white"
          overflow="hidden"
        >
          <Formik
            initialValues={datos}
            validationSchema={validationSchema}
            onSubmit={({ nombre,prueba_id, fecha_inicio, fecha_fin,descripcion, email, semestre, estado }, { setFieldValue }) => {
              actualizarConvocatoria(nombre, prueba_id, descripcion, fecha_inicio, fecha_fin,params.id)
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
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.prueba_id && touched.prueba_id}>
                        <FormLabel htmlFor="prueba_id">Prueba</FormLabel>
                        <Field
                          name="prueba_id"
                          as={Select}
                          id="prueba_id"
                          type="text"
                          maxW={["200px", "250px", "200px", "200px"]}
                          w="400px"
                        >
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
                    <Box
                      display={"flex"}
                        flexDir={["column","column","row"]}
                        alignItems={"center"}
                        
                        justifyContent={"center"}
                        gap={"15px"}
                    >
                      
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.fecha_inicio && touched.fecha_inicio}>
                        <FormLabel htmlFor="fecha_inicio">Fecha Inicial</FormLabel>
                        <Field
                          name="fecha_inicio"
                          as={Input}
                          id="fecha_inicio"
                          type="date"
                          maxW={["200px", "250px", "200px", "200px"]}
                          w="400px"
                        />
                        <FormErrorMessage>{errors.fecha_inicio}</FormErrorMessage>
                      </FormControl>
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.fecha_fin && touched.fecha_fin}>
                        <FormLabel htmlFor="fecha_fin">Fecha final</FormLabel>
                        <Field
                          name="fecha_fin"
                          as={Input}
                          id="fecha_fin"
                          type="date"
                          maxW={["200px", "250px", "200px", "200px"]}
                        />
                        <FormErrorMessage>{errors.fecha_fin}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box w={"100%"}>
                         <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.descripcion && touched.descripcion}>
                        <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
                        <Field
                          name="descripcion"
                          as={Input}
                          id="descripcion"
                          type="text"
                          w="100%"
                        />
                        <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
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
  )
        }
