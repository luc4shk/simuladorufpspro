import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import CompetenciaBody from '../../../components/pure/CompetenciaBody'
import { AppContext } from '../../../components/context/AppProvider'

export default function Competencias() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<CompetenciaBody/>} msg={"Competencias"} />
    )
}
