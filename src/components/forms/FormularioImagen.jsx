import {React, useState, useRef, useContext, useEffect} from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { Box, FormControl, Input, Image, Button, Flex, FormErrorMessage } from "@chakra-ui/react";
import { useLocation } from "wouter";
import { toast } from "react-hot-toast";
export default function Formularioavatar() {
  const {token, setToken,imagen, setImagen, user} = useContext(AppContext)
  const inputRef = useRef()
  const [loc, navigation] = useLocation()
  const initialValues = {
    avatar: null,
  };

const actualizaravatar = async (file) =>{
   const formData = new FormData();
    formData.append("avatar", file);

  let response = await axiosApi.put(`/api/user/admin/updatePhoto/${1}`,formData,
  {
    headers: {
            "Content-Type": "multipart/form-data",
            Authorization:"Bearer " + token
        },
  }).catch((e)=>toast.error("Error al actualizar el avatar"))

  if(response.status === 200){
    toast.success("Imagen actualizada correctamente")
  }
  "" 
  localStorage.setItem("imagen",response.data.imageFile)
  setImagen(localStorage.getItem("imagen"))

  const time = setTimeout(()=>{
  window.location.reload()
  },2000)
  // navigation("/home")
}



 
const validationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .test("file-type", "El tipo de archivo es PNG/JPEG", (value) => {
      if (value) {
        return value.endsWith(".jfif") || value.endsWith(".png")
      }
      return true;
    }).required("El avatar es requerido"),
});


  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("avatar", inputRef.current.files[0]);

    };

  return (
    <Box
      w={["250px", "350px", "400px", "400px", "500px"]}
      bgColor="white"
      borderRadius="8px"
      height="auto"
      padding="20px"
    >
      <Flex w="100%" alignItems="center" justifyContent="center" mb="15px">
        <Image
          src={imagen}
          width={["100px", "130px"]}
          height={["100px", "130px"]}
          borderRadius="50%"
          objectFit="cover"
          objectPosition="center"
        />
      </Flex>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => {
        actualizaravatar(inputRef.current.files[0])
      }}>
        {(props) => {
          const { errors, touched, setFieldValue } = props;

          return (
            <Form >
              <Flex flexDir={"column"} gap={"15px"}>
              <FormControl isInvalid={errors.avatar && touched.avatar} display="flex" justifyContent="center" flexDir={"column"}>
                <Field id="avatar" name="avatar" >
                  {({ field }) => (
                    <Input type="file" name="avatar" ref={inputRef}
                     variant="unstyled" onChange={(event) =>{ 
                      handleFileChange(event, setFieldValue)
                     }
                    } {...field} />
                  )}
                </Field>
                <FormErrorMessage>{errors.avatar}</FormErrorMessage>
              </FormControl>
              <Button type="submit" w="100%">
                Actualizar
              </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
