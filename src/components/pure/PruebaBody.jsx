import React from "react";
import TablaCustom from "./TablaCustom";
import { Center } from "@chakra-ui/react";
import { RiEdit2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import TablaPrueba from "./TablaPrueba";
export default function PruebaBody() {
  const columns = ["Nombre", "Semestre", "Competencias"];


  return (
    <TablaPrueba
      columns={columns}
      path={"/crearPrueba"}
      msg={"Crear Prueba"}
      showButton={true}
    />
  );
}
