import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpRequest from "../../Helpers/ServerRequest";
import "./Cargadores.css"

import Registro from "../../Pages/Registro";
import RegistroProducto from "../../Pages/RegistroProducto";

export default function CargarFormRegistro({ isUpdate = false, typeOfForm }){

    const navigate = useNavigate();
    const [dataUpdate, setDataUpdate] = useState(null);
    const [loading, setLoading] = useState(isUpdate);
    const { elementID } = useParams();

    const formsParaCargar = { 
        
        "Usuarios": {
            "RegistroAgregar": <Registro addedFromCrud={ true }/>,
            "RegistroActualizar": <Registro isUpdate={ true } data={ dataUpdate } />,
            "urlUpdate": "http://127.0.0.1:8000/api/usuarios/",
            "routeDashboard": "/usuarios"
        }, 
    
        "Productos": {
            "RegistroAgregar": <RegistroProducto/>,
            "RegistroActualizar": <RegistroProducto isUpdate={ true } data={ dataUpdate } />,
            "urlUpdate": "http://127.0.0.1:8000/api/productos/",
            "routeDashboard": "/productos"
        }
    
    }

    if(!isUpdate){
        return formsParaCargar[typeOfForm]["RegistroAgregar"];
    }

    useEffect(() => {
        
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }

        if (isUpdate) {
            const urlUpdate = formsParaCargar[typeOfForm]["urlUpdate"] + elementID;
            console.log(urlUpdate);
            async function fetchUpdateData() {
                const updateData = await sendRequest(urlUpdate, "get", null, true);
                console.log(updateData);
                if (updateData.status === 404) {
                    navigate(formsParaCargar[typeOfForm]["routeDashboard"]);
                } else {
                    setDataUpdate(updateData);
                }
            }

            fetchUpdateData();
        }
    }, [isUpdate, elementID, navigate]); 

    async function sendRequest(url, method, data, needAuth){
        try{
            const response = await httpRequest(url, method, data, needAuth);
            return response.data;
        }
        catch(error){
            if(error.response.data.status === 404){
                return error.response.data;
            }
        }
        finally{
            setLoading(false);
        }
    }

    if (isUpdate && loading) {
        return <span className="loader d-flex justify-content-center"> Cargando datos... </span>;
    }

    if(isUpdate && !loading){
        return formsParaCargar[typeOfForm]["RegistroActualizar"]
    }
    
    
    
}