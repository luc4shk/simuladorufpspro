import {React, useContext, useEffect, useState} from "react";
import TablaCustom from "./TablaCustom";
import { RiEdit2Fill } from "react-icons/ri";
import { Center } from "@chakra-ui/react";
import TablaCategoria from "./TablaCategoria";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { Toaster, toast } from "react-hot-toast";

export default function CategoriaBody() {
  const {token} = useContext(AppContext)
  const columns = [
    "Id",
    "Nombre",
    "Estado",
    "Competencia",
    "Editar",
  ];
  const [categorias, setCategorias] = useState()
  const obtenerCategorias = async () =>{
     let response = await axiosApi.get("api/categoria",{
      headers:{
        Authorization:"Bearer " + token,
      }
     }).catch((e)=>{
        toast.error(e.response.data.error)
     })
     setCategorias(response.data)
  }

  useEffect(()=>{
    obtenerCategorias()
  },[])
  
  const items = [
    [
      "INGLÉS",
      "20",
      "Activo",
      "GENÉRICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
    [
      "ANÁLISIS Y DISEÑO",
      "30",
      "Activo",
      "ESPECÍFICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
    [
      "LECTURA CRÍTICA",
      "15",
      "Activo",
      "GENÉRICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
    [
      "FORMULACIÓN DE PROYECTOS",
      "32",
      "Activo",
      "ESPECÍFICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
    [
      "INGLÉS",
      "20",
      "Activo",
      "GENÉRICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
    [
      "ANÁLISIS Y DISEÑO",
      "30",
      "Activo",
      "ESPECÍFICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
    [
      "LECTURA CRÍTICA",
      "15",
      "Activo",
      "GENÉRICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
    [
      "FORMULACIÓN DE PROYECTOS",
      "32",
      "Activo",
      "ESPECÍFICA", //aqui se deberia extraer de la entidad competencia!!!
      <Center>
        <RiEdit2Fill />
      </Center>,
    ],
  ];
  return (
   <> 
    {
      categorias ? 
      <TablaCategoria
      columns={columns}
      items={categorias}
      path={"/formularioCategoria"}
      msg={"Agregar Categoria"}
      showButton={true}
    />:
    <div>Cargando...</div>
    }
    
    
    </>
  );
}
