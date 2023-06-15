import React, { useContext } from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import PreguntaBody from "../../../components/pure/PreguntaBody"
export default function Preguntas() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<PreguntaBody/>} msg={"Preguntas"} /> 
  )
}
