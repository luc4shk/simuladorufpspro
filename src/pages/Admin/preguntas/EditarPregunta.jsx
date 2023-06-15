import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormEditarPregunta from '../../../components/forms/FormEditarPregunta' 
import { AppContext } from '../../../components/context/AppProvider'
export default function EditarPregunta() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormEditarPregunta/>} msg={"Competencias"} />
    )
}
