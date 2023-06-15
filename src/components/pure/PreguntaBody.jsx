import React from "react";
import TablaCustom from "./TablaCustom";
import { Center } from "@chakra-ui/react";
import { RiEdit2Fill } from "react-icons/ri";
import TablaPregunta from "./TablaPregunta";
export default function PreguntaBody() {
  const columns = [
    "Id",
    "Enunciado",
    "Semestre",
    "Estado",
    "Categoria",
    "Editar",
  ];
  
  return (
    <TablaPregunta
      columns={columns}
      path={"/tipoPregunta"}
      msg={"Agregar Pregunta"}
      showButton={true}
    />
  );
}
