import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormularioCambiarContrasenia from '../../../components/forms/FormularioCambiarContrasenia'
import FormularioImagen from '../../../components/forms/FormularioImagen'

export default function CambiarImagen() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioImagen/>} msg={"Principal"} />
    )
}
