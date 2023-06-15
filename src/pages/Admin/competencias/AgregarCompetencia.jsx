import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormularioCompetencia from '../../../components/forms/FormularioCompetencia'
import { AppContext } from '../../../components/context/AppProvider'

export default function AgregarCompetencias() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioCompetencia/>} msg={"Competencias"} />
    )
}
