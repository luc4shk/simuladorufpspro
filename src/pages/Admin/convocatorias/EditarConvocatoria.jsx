import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormularioEditarCompetencia from '../../../components/forms/FormEditarCompetencia'
import { AppContext } from '../../../components/context/AppProvider'
import FormEditarConvocatoria from '../../../components/forms/FormEditarConvocatoria'

export default function EditarConvocatoria() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormEditarConvocatoria/>} msg={"Competencias"} />
    )
}
