import { toast } from "react-hot-toast";
import axiosApi from "../../utils/config/axios.config";
import axios from "axios";

export const login = async (email,password) =>{


    let body = {
       email,
       password
    }
    let response = await axiosApi.post("/api/auth/login",body,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    }).catch(()=>{
        toast.error("Credenciales Incorrectas")
    })
    return response.data
}



export const getAdministratorById = async (id) =>{

    let response = await axiosJWT.get(`/admin/${id}`,{
        headers:{ Authorization:"Bearer " + user.accesToken},
    })
    return response.data
    
}

