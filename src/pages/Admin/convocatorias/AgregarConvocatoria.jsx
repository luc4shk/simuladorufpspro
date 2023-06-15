import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormularioConvocatoria from '../../../components/forms/FormularioConvocatoria'
export default function AgregarConvocatoria() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioConvocatoria/>} msg={"Estudiantes"} />
    )
}
