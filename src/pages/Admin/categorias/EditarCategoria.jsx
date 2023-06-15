import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormEditarCategoria from '../../../components/forms/FormEditarCategoria'
import { AppContext } from '../../../components/context/AppProvider'

export default function AgregarCategoria() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormEditarCategoria/>} msg={"Categorias"} />
    )
}