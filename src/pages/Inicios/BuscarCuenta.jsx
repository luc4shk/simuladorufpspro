import React, { useContext } from 'react'
import { AppContext } from '../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import EmailRecuperación from '../../components/forms/EmailRecuperacion'
export default function BuscarCuenta() {

  const {change, open} = useContext(AppContext)

  return (
    <Page changeOpen={change} isOpen={open} componente={<EmailRecuperación/>} msg={"Categorias"}/>
  )
}
