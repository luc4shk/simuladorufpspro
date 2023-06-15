import React, { useContext } from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import CategoriaBody from '../../../components/pure/CategoriaBody'
export default function Categorias() {

  const {change, open} = useContext(AppContext)

  return (
    <Page changeOpen={change} isOpen={open} componente={<CategoriaBody/>} msg={"Categorias"}/>
  )
}
