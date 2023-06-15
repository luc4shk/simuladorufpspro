import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormularioEditarCompetencia from '../../../components/forms/FormEditarCompetencia'
import { AppContext } from '../../../components/context/AppProvider'

export default function EditarCompetencia() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioEditarCompetencia/>} msg={"Competencias"} />
    )
}
