import React , {useContext}from 'react'
import Page from '../../../components/container/Page'
import AdminProfileForm from '../../../components/forms/AdminProfileForm'
import { AppContext } from '../../../components/context/AppProvider'

export default function PrincipalPage() {

  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<AdminProfileForm/>} msg={"Panel Principal"} />
  )
}
