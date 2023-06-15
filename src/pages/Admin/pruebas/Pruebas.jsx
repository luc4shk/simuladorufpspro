import React,{useContext} from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import PruebaBody from "../../../components/pure/PruebaBody"
export default function Pruebas() {

    const {change, open} = useContext(AppContext)

    return (
    <Page changeOpen={change} isOpen={open} componente={<PruebaBody/>} msg={"Pruebas"}/>
    )
}
