import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import CardLogo from "../../components/pure/CardLogo";
import {React, useContext} from "react";
import { AppContext } from "../../components/context/AppProvider";
import { login } from "../../services/user/axios.service";
import { Link, useLocation} from "wouter";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const {logged, setLogged, user, setUser,token, setToken} = useContext(AppContext)


  const [location, navigate] = useLocation();

  const notify = (values = "Va") => {
    toast.success("Ingreso exitoso!");
  };


  const ingresar = async (email, password) =>{
    const data = await login(email,password)
    // document.cookie = data.accessToken
    
    localStorage.setItem("token",data.accessToken)
    setToken(localStorage.getItem("token"))
    localStorage.setItem("username", data.username)
    localStorage.setItem("role",data.role)
    setUser({
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role")
    })
    navigate("/") 
  } 

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Correo Inválido").required("Correo requerido"),
    password: Yup.string()
      .required("Contraseña requerida")
      .min(5, "La contraseña es muy corta")
      .max(20, "La contraseña es muy larga"),
  });

  return (
    <CardLogo wd={"380px"} hg={"500px"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={({email, password}) => {
          // notify();
          ingresar(email, password)
        }}
      >
        {(props) => {
          const { values, errors, isSubmitting, touched } = props;

          return (
            <Form>
              <FormControl isInvalid={errors.email && touched.email}>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  variant="filled"
                  borderColor="gray.300"
                  type="email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password && touched.password}>
                <FormLabel htmlFor="password" mt={4}>
                  Contraseña
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
              <Box mt={4} textAlign="center" color={"blue.400"} textDecoration={"underline"}>
                
                {/* <Link color="blue.400" to="/recuperarEmail" _hover="none">
                  Olvidé mi contraseña
                </Link> */}
                <Link to="/recuperarEmail"  _hover="none">Olvidé mi contraseña</Link>
              </Box>
              <Button
                color="white"
                background={"principal.100"}
                mt={4}
                width="full"
                type="submit"
              >
                Ingresar
              </Button>
            </Form>
          );
        }}
      </Formik>
    </CardLogo>
  );
}
