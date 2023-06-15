import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormularioPreguntaSimple from '../../../components/forms/FormularioPreguntaSimple'
import { AppContext } from '../../../components/context/AppProvider'

export default function PreguntaSimple() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioPreguntaSimple/>} msg={"Preguntas"} />
    )
}
