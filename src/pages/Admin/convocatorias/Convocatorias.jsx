import React,{useContext}from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import ConvocatoriaBody from "../../../components/pure/ConvocatoriaBody"
export default function Convocatorias() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<ConvocatoriaBody/>} msg={"Convocatorias"}/>
        )
}
