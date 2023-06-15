import React, { useContext } from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import EstudianteBody from "../../../components/pure/EstudianteBody"
export default function Estudiantes() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<EstudianteBody/>} msg={"Estudiantes"}/>
        )
}
