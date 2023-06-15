import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormularioCompetencia from '../../../components/forms/FormularioCompetencia'
import { AppContext } from '../../../components/context/AppProvider'
import FormularioPrueba from '../../../components/forms/FormularioPrueba'

export default function AgregarPrueba() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioPrueba/>} msg={"Pruebas"} />
    )
}
