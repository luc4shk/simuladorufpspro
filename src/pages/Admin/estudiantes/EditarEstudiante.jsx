import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormEditarEstudiante from '../../../components/forms/FormEditarEstudiante'
export default function EditarEstudiante() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormEditarEstudiante/>} msg={"Estudiantes"} />
    )
}
