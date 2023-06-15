import {React, createContext, useState, useEffect} from 'react'
import axios from 'axios';
import axiosApi from "../../utils/config/axios.config";
export const AppContext = createContext();
import jwt_decode from "jwt-decode";
import { login } from "../../services/user/axios.service";
import { useLocation } from 'wouter';

export function AppProvider({children}) {

  const [open, setOpen] = useState(false);
  const change = () => setOpen(!open);
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const [loc, navigate] = useLocation()
  const [imagen, setImagen] = useState()
 

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
    setImagen(localStorage.getItem("imagen"))
    setUser({
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role")
    })
  },[])



  return (
    <AppContext.Provider value={{open,change, user, setUser, token, setToken,imagen, setImagen}}>
      {children}
    </AppContext.Provider>
  )
}
