import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormularioCambiarContrasenia from '../../../components/forms/FormularioCambiarContrasenia'

export default function CambiarContrasenia() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioCambiarContrasenia/>} msg={"Principal"} />
    )
}
