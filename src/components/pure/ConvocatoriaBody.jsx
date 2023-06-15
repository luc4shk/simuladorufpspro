import React from "react";
import TablaCustom from "./TablaCustom";
import { Center } from "@chakra-ui/react";
import { RiEdit2Fill, RiDeleteBin2Fill, RiEyeFill } from "react-icons/ri";
import { BsFillFileEarmarkBarGraphFill } from "react-icons/bs";
import TablaConvocatoria from "./TablaConvocatoria";

export default function ConvocatoriaBody() {
  const columns = [
    "Id",
    "Nombre",
    "Estado",
    "Fecha de Inicio",
    "Fecha de Finalización",
    "Editar",
  ];

  return (
    <TablaConvocatoria
      columns={columns}
      path={"/formularioConvocatoria"}
      msg={"Agregar Convocatoria"}
      showButton={true}
    />
  );
}
