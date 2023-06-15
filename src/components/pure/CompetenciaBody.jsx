import {React, useContext, useEffect, useState} from "react";
import TablaCustom from "./TablaCompetencia";
import { RiEdit2Fill } from "react-icons/ri";
import { Center } from "@chakra-ui/react";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import { toast, Toaster } from "react-hot-toast";

export default function CompetenciaBody() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState()
  const {token} = useContext(AppContext)

  const obtenerCompetencias = async () =>{
    let response = await axiosApi.get("/api/competencia",{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
      toast.error("Fallo al traerlos las competencias")
    })

    setItems(response.data)
    setLoading(false)
  }

  useEffect(()=>{
    obtenerCompetencias()
  },[])

  const columns = ["id","Nombre", "Estado","Categorías", "Editar"];
  // const items = [
  //   [
  //     "GENÉRICAS",
  //     "esta competencia es de tipo genéricas ",
  //     <Center>
  //       <RiEdit2Fill />
  //     </Center>,
  //     "Activo",
  //   ],
  //   [
  //     "ESPECÍFICAS",
  //     "esta competencia es de tipo específica ",
  //     <Center>
  //       <RiEdit2Fill />
  //     </Center>,
  //     "Activo",
  //   ],
  //   [
  //     "GENÉRICAS",
  //     "esta competencia es de tipo genérica ",
  //     <Center>
  //       <RiEdit2Fill />
  //     </Center>,
  //     "Activo",
  //   ],
  // ];

  return (
    <>
    {loading ? 
      <div>Cargando...</div>
      :
      <TablaCustom
      columns={columns}
      items={items}
      path={"/formularioCompetencia"}
      msg={"Agregar Competencia"}
      showButton={true}
    />
    }
    
    </>
  );
}
