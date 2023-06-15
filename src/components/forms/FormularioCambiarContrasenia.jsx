import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Toast,
} from "@chakra-ui/react";
import axiosApi from "../../utils/config/axios.config";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { Toaster, toast} from "react-hot-toast";
import {React, useContext }from "react";
import { Link } from "wouter";
import { AppContext } from "../context/AppProvider";
import Boton from "../pure/Boton";

export default function FormularioCambiarContraseña() {

  const {token,user} = useContext(AppContext)
  const cambiarContraseña = async (password, newPassword) =>{
    let body = {
        email:user.username,
        password,
        newPassword
    }
    let response = await axiosApi.put("api/user/admin/updatePassword",body,{
       headers: {
            "Content-Type": "application/json",
            Authorization:"Bearer " + token
        },
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })

    if(response.status === 200){
      toast.success(`¡${response.data.message}!`)
    }
    "" 
  }

  const initialValues = {
    passwordActual: "",
    password: "",
    passwordR: "",
  };



  const validationSchema = Yup.object().shape({
    passwordActual: Yup.string().required("Contraseña actual requerida"),
    password: Yup.string()
      .required("Contraseña requerida")
      .min(10, "La contraseña es muy corta")
      .max(65, "La contraseña es muy larga"),
    passwordR: Yup.string()
      .required("Contraseña requerida")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  });

  return (
    <Box
      bg="white"
      borderRadius="md"
      p={6}
      pt={8}
      width={{ base: "100%", sm: "380px" }}
      height="auto"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({passwordR, passwordActual}) => {
          cambiarContraseña(passwordActual, passwordR)

        }}
      >
        {(props) => {
          const { errors, touched } = props;

          return (
            <Form>
              <FormControl
                isInvalid={errors.passwordActual && touched.passwordActual}
              >
                <FormLabel htmlFor="passwordActual" mt={4}>
                  Contraseña Actual
                </FormLabel>
                <Field
                  as={Input}
                  id="passwordActual"
                  name="passwordActual"
                  borderColor="gray.300"
                  variant="filled"
                  type="password"
                />
                <FormErrorMessage>{errors.passwordActual}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password && touched.password}>
                <FormLabel htmlFor="password" mt={4}>
                  Contraseña Nueva
                </FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  borderColor="gray.300"
                  variant="filled"
                  type="password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.passwordR && touched.passwordR}>
                <FormLabel htmlFor="passwordR" mt={4}>
                  Repetir Contraseña
                </FormLabel>
                <Field
                  as={Input}
                  id="passwordR"
                  name="passwordR"
                  borderColor="gray.300"
                  variant="filled"
                  type="password"
                />
                <FormErrorMessage>{errors.passwordR}</FormErrorMessage>
              </FormControl>
              <Button
                color="white"
                background="principal.100"
                mt={4}
                width="full"
                type="submit"
              >
                Aceptar
              </Button>
              {/* <Boton
              as={"link"}
              path={"/"}
              msg={"Aceptar"}
              mt={4}
              width="full"
              type={"submit"}
            /> */}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
