import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import TipoPregunta from '../../../components/pure/TipoPregunta'
// import TipoPregunta from '../../../components/forms/FormularioPreguntaSimple'
import { AppContext } from '../../../components/context/AppProvider'

export default function AgregarCompetencias() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<TipoPregunta/>} msg={"Preguntas"} />
    )
}
