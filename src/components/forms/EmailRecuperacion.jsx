import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import * as Yup from "yup";
  import { Formik, Field, Form } from "formik";
  import toast from "react-hot-toast";
  import CardLogo from "../pure/CardLogo";
  import React from "react";
import axiosApi from "../../utils/config/axios.config";
  
  export default function EmailRecuperación() {
    const initialValues = {
      email: "",
    };
  
  const requestPassword = async (email, url) =>{
    let body={
      email:email,
      redirectURL:url
    }
    let response = await axiosApi.post("/api/auth/requestPasswordReset",body,{

    }).catch((e)=>{
      toast.error(e.response.data.error)
    })

    if(response.status === 200){
      toast.success("¡Mensaje enviado correctamente!")
    }
    console.log(response)
  }
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Correo Inválido").required("Correo requerido"),
    });
  
    return (
      <CardLogo wd={"450px"} hg={"400px"}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={({email}) => {
            requestPassword(email, "http://localhost:5173/newPassword")
          }}
        >
          {(props) => {
            const { values, errors, isSubmitting, touched } = props;
  
            return (
              <Form>
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel textAlign="center" htmlFor="email">
                    Ingresa tu correo para buscar tu cuenta
                  </FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    variant="filled"
                    borderColor="gray.300"
                    type="email"
                    mt={4}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <Button
                  color="white"
                  background={"principal.100"}
                  mt={8}
                  width="full"
                  type="submit"
                >
                  Buscar
                </Button>
              </Form>
            );
          }}
        </Formik>
      </CardLogo>
    );
  }